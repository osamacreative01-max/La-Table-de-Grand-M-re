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
  // Shown up to ~1.4x the screen width when cropped to cover, so keep the full source width.
  ["Home page banner k neech Ya jagan acha lage.jpg", "banner-product-range", 4000],
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
  // The toast alone, for the peanut butter recipe (the full shot is the product card's)
  ["Asset 24@4x-100.jpg", "dish-peanut-butter-toast", { left: 440, top: 600, width: 652, height: 489 }],
  // Grand-maman, for the Our Story page: cooking with her granddaughters, and close up
  ["Our Story.jpg", "story-grandma-cooking", { left: 2300, top: 0, width: 1700, height: 1667 }],
  ["Our Story.jpg", "story-grandma-close", { left: 3150, top: 80, width: 850, height: 1100 }],
  // The dishes half of the flat-lay (its right half fades to cream), for the business page
  ["Random.jpg", "business-spread", { left: 0, top: 0, width: 1820, height: 1365 }],
  // Her portrait from the logo artwork (2048px source), without the nameplate
  ["../../../assets/brand/logo-source.png", "story-grandma-portrait", { left: 553, top: 236, width: 1024, height: 1000 }],
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
