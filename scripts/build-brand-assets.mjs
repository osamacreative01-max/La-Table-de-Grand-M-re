/**
 * Turns the original brand artwork into the web-ready files the site imports:
 *
 *   assets/brand/logo-source.png  ->  public/brand/logo.png   (header/footer mark)
 *                                 ->  src/app/icon.png        (browser tab icon)
 *                                 ->  src/app/apple-icon.png  (iOS home screen)
 *                                 ->  src/app/favicon.ico     (legacy /favicon.ico)
 *
 * The source is a full-resolution export (several MB), so it is kept out of the
 * build. Re-run after replacing the artwork:
 *
 *   node scripts/build-brand-assets.mjs
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = "assets/brand/logo-source.png";
const LOGO_OUTPUT = "public/brand/logo.png";
const LOGO_WIDTH = 192;
const ICON_OUTPUT = "src/app/icon.png";
const APPLE_ICON_OUTPUT = "src/app/apple-icon.png";
const ICO_OUTPUT = "src/app/favicon.ico";

/** Cream page background, used behind the opaque iOS icon. */
const ICON_BACKGROUND = "#f7f2e9";

/** Drops the transparent (and near-transparent) margin around the badge. */
async function trimmedBadge() {
  const source = await readFile(SOURCE);
  return sharp(source).ensureAlpha().trim({ threshold: 10 }).png().toBuffer();
}

/** Fits the badge inside a square canvas, optionally over a solid background. */
async function square(badge, size, background) {
  const inner = Math.round(size * 0.92);
  const resized = await sharp(badge)
    .resize(inner, inner, { fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toBuffer();
}

/** Wraps PNG payloads in a multi-resolution .ico container. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = header.length + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

await mkdir(path.dirname(LOGO_OUTPUT), { recursive: true });
await mkdir(path.dirname(ICO_OUTPUT), { recursive: true });

const badge = await trimmedBadge();

await sharp(badge)
  .resize({ width: LOGO_WIDTH, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toFile(LOGO_OUTPUT);

await sharp(await square(badge, 256))
  .png({ compressionLevel: 9, palette: true, quality: 95 })
  .toFile(ICON_OUTPUT);

await sharp(await square(badge, 180, ICON_BACKGROUND))
  .png({ compressionLevel: 9 })
  .toFile(APPLE_ICON_OUTPUT);

const icoImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await sharp(await square(badge, size)).png({ compressionLevel: 9 }).toBuffer(),
  })),
);
await writeFile(ICO_OUTPUT, buildIco(icoImages));

const { size: logoBytes } = await stat(LOGO_OUTPUT);
console.log(`${LOGO_OUTPUT} — ${Math.round(logoBytes / 1024)} KB`);
console.log(`${ICON_OUTPUT}, ${APPLE_ICON_OUTPUT}, ${ICO_OUTPUT} written.`);
