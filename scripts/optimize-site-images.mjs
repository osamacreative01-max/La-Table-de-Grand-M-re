/**
 * Turns the client's "Website Material" banners and lifestyle photos into
 * web-ready WebP files in `public/images`.
 *
 * The originals are 4000 px exports (~15 MB total) and stay out of git.
 * Re-run after replacing the artwork:
 *
 *   node scripts/optimize-site-images.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "public/Website Material (1)/Website Material";
const OUTPUT_DIR = "public/images";

/** source file -> [output name, max width] */
const jobs = [
  ["Home Page.jpg", "hero-family-table", 2400],
  ["Home page banner k neech Ya jagan acha lage.jpg", "banner-product-range", 2400],
  ["Our Story.jpg", "hero-our-story", 2400],
  ["Random.jpg", "hero-recipes", 2400],
  ["Asset 24@4x-100.jpg", "lifestyle-peanut-butter", 900],
  ["Asset 25@4x-100.jpg", "lifestyle-spicy-chicken-noodles", 900],
  ["Asset 26@4x-100.jpg", "lifestyle-chicken-luncheon-meat", 900],
  ["Asset 27@4x-100.jpg", "lifestyle-red-split-lentils", 900],
];

/**
 * Dishes cropped out of the flat-lay spread (Random.jpg), each matching a
 * serving suggestion from the client's product portfolios.
 * source file -> [output name, { left, top, width, height }]
 */
const crops = [
  ["Random.jpg", "dish-chickpea-salad", { left: 730, top: 700, width: 680, height: 680 }],
  ["Random.jpg", "dish-tuna-toast", { left: 300, top: 560, width: 640, height: 640 }],
  ["Random.jpg", "dish-luncheon-potatoes", { left: 860, top: 120, width: 600, height: 600 }],
  ["Random.jpg", "dish-pineapple-chunks", { left: 0, top: 0, width: 900, height: 900 }],
];

await mkdir(OUTPUT_DIR, { recursive: true });

const report = (output, info) =>
  console.log(`${output}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);

for (const [source, name, width] of jobs) {
  const output = path.join(OUTPUT_DIR, `${name}.webp`);
  const info = await sharp(path.join(SOURCE_DIR, source))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output);
  report(output, info);
}

for (const [source, name, region] of crops) {
  const output = path.join(OUTPUT_DIR, `${name}.webp`);
  const info = await sharp(path.join(SOURCE_DIR, source))
    .extract(region)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output);
  report(output, info);
}
