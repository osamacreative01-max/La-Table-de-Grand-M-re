/**
 * Turns the full-resolution product mockups in `public/MOCKUPS` into
 * web-ready, transparent-background images in `public/products`.
 *
 * The mockups ship on a flat #f5f5f5 studio background. We flood-fill that
 * connected background from the edges and turn it into transparency, so the
 * artwork can sit on cream, sand or white surfaces with real CSS shadows.
 *
 * Usage: node scripts/optimize-product-images.mjs
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "public/MOCKUPS";
const OUTPUT_DIR = "public/products";
const MAX_SIZE = 1600;
const QUALITY = 88;

/** Anything this close to the studio background (#f5f5f5) becomes transparent. */
const LIGHT_THRESHOLD = 224;
const NEUTRAL_SPREAD = 12;

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const isBackground = (data, pixel) => {
  const r = data[pixel];
  const g = data[pixel + 1];
  const b = data[pixel + 2];
  const neutral = Math.max(r, g, b) - Math.min(r, g, b) <= NEUTRAL_SPREAD;
  // Any neutral, light pixel connected to the edge is studio background or its
  // soft shadow. Whites enclosed by the can (labels, highlights) stay opaque
  // because the flood fill never reaches them.
  return neutral && Math.min(r, g, b) >= LIGHT_THRESHOLD;
};

/**
 * Flood-fills the studio background from every edge into an alpha mask.
 * Returns a width*height buffer where 0 is transparent and 255 is solid.
 */
function buildAlphaMask(data, width, height, channels) {
  const alpha = new Uint8Array(width * height).fill(255);
  const queue = [];

  const seed = (x, y) => {
    const index = y * width + x;
    if (alpha[index] === 0) return;
    if (!isBackground(data, index * channels)) return;
    alpha[index] = 0;
    queue.push(index);
  };

  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
  }

  while (queue.length) {
    const index = queue.pop();
    const x = index % width;
    const y = (index - x) / width;

    if (x > 0) seed(x - 1, y);
    if (x < width - 1) seed(x + 1, y);
    if (y > 0) seed(x, y - 1);
    if (y < height - 1) seed(x, y + 1);
  }

  return alpha;
}

/**
 * Softens the light-grey studio shadow that hugs the cut-out edge: neutral
 * pixels just outside the artwork fade out instead of leaving a grey smudge
 * on the cream background.
 */
function featherEdge(alpha, data, width, height, channels) {
  const next = Uint8Array.from(alpha);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      if (alpha[index] === 0) continue;

      let touchesBackground = false;
      for (let dy = -1; dy <= 1 && !touchesBackground; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          if (alpha[ny * width + nx] === 0) {
            touchesBackground = true;
            break;
          }
        }
      }
      if (!touchesBackground) continue;

      const pixel = index * channels;
      const r = data[pixel];
      const g = data[pixel + 1];
      const b = data[pixel + 2];
      const neutral = Math.max(r, g, b) - Math.min(r, g, b) <= 18;
      const light = Math.min(r, g, b) >= 205;
      if (!neutral || !light) continue;

      const fade = Math.max(0, Math.min(255, ((247 - Math.min(r, g, b)) / 42) * 255));
      next[index] = Math.min(alpha[index], Math.round(fade));
    }
  }

  return next;
}

/** Bounding box of the opaque artwork, ignoring the transparent margin. */function opaqueBounds(alpha, width, height) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] === 0) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  return { minX, minY, maxX, maxY };
}

async function processImage(file) {
  const input = path.join(SOURCE_DIR, file);
  const output = path.join(OUTPUT_DIR, `${slugify(file.replace(/\.png$/i, ""))}.webp`);

  const { data, info } = await sharp(input)
    .resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const mask = buildAlphaMask(data, width, height, channels);
  const alpha = featherEdge(mask, data, width, height, channels);

  // Assemble RGBA by hand; joinChannel gets confused by raw buffers this size.
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const at = i * 4;
    rgba[at] = data[i * channels];
    rgba[at + 1] = data[i * channels + 1];
    rgba[at + 2] = data[i * channels + 2];
    rgba[at + 3] = alpha[i];
  }

  const { minX, minY, maxX, maxY } = opaqueBounds(mask, width, height);
  const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.04);
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - left, maxX - minX + pad * 2);
  const cropHeight = Math.min(height - top, maxY - minY + pad * 2);

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .webp({ quality: QUALITY, alphaQuality: 100, effort: 6 })
    .toFile(output);

  return { output, width: cropWidth, height: cropHeight };
}

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR)).filter((file) => /\.png$/i.test(file));
const results = await Promise.all(files.map(processImage));

for (const result of results) {
  console.log(`${result.output} — ${result.width}×${result.height}`);
}

console.log(`\nOptimised ${results.length} images into ${OUTPUT_DIR}.`);
