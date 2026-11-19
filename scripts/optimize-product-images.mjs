/**
 * Turns the full-resolution product mockups in `public/MOCKUPS` into
 * web-ready images in `public/products`.
 *
 * The mockups ship on a flat #f5f5f5 studio background. We flood-fill that
 * connected background to pure white so the artwork can sit on any cream
 * surface with `mix-blend-multiply` and look like it was photographed there.
 *
 * Usage: node scripts/optimize-product-images.mjs
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "public/MOCKUPS";
const OUTPUT_DIR = "public/products";
const MAX_SIZE = 1600;
const QUALITY = 86;

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Replace the connected studio background with pure white. */
function whitenBackground(data, width, height, channels, tolerance = 10) {
  const sr = data[0];
  const sg = data[1];
  const sb = data[2];
  const visited = new Uint8Array(width * height);
  const stack = [0];

  while (stack.length) {
    const index = stack.pop();
    if (visited[index]) continue;
    visited[index] = 1;

    const pixel = index * channels;
    if (
      Math.abs(data[pixel] - sr) > tolerance ||
      Math.abs(data[pixel + 1] - sg) > tolerance ||
      Math.abs(data[pixel + 2] - sb) > tolerance
    ) {
      continue;
    }

    data[pixel] = 255;
    data[pixel + 1] = 255;
    data[pixel + 2] = 255;

    const x = index % width;
    const y = (index - x) / width;
    if (x > 0) stack.push(index - 1);
    if (x < width - 1) stack.push(index + 1);
    if (y > 0) stack.push(index - width);
    if (y < height - 1) stack.push(index + width);
  }
}

function contentBounds(data, width, height, channels) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = (y * width + x) * channels;
      const offWhite =
        data[pixel] < 240 || data[pixel + 1] < 240 || data[pixel + 2] < 240;
      if (!offWhite) continue;
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

  whitenBackground(data, info.width, info.height, info.channels);

  const { minX, minY, maxX, maxY } = contentBounds(
    data,
    info.width,
    info.height,
    info.channels,
  );

  const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.05);
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const width = Math.min(info.width - left, maxX - minX + pad * 2);
  const height = Math.min(info.height - top, maxY - minY + pad * 2);

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .extract({ left, top, width, height })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(output);

  return { output, width, height };
}

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR)).filter((file) => /\.png$/i.test(file));
const results = await Promise.all(files.map(processImage));

for (const result of results) {
  console.log(`${result.output} — ${result.width}×${result.height}`);
}

console.log(`\nOptimised ${results.length} images into ${OUTPUT_DIR}.`);
