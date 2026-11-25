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

await mkdir(OUTPUT_DIR, { recursive: true });

for (const [source, name, width] of jobs) {
  const output = path.join(OUTPUT_DIR, `${name}.webp`);
  const info = await sharp(path.join(SOURCE_DIR, source))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output);
  console.log(`${output}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
