import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // One root layout per language, so unmatched URLs need a standalone 404.
  experimental: { globalNotFound: true },
  // Product shots are already cropped, resized and encoded to WebP by
  // scripts/optimize-product-images.mjs, and they carry an alpha channel that
  // the on-demand optimizer would flatten to JPEG. Serve them as-is.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
