# Image credits

Stock photos used where the client material had no image. All are from
Unsplash under the [Unsplash License](https://unsplash.com/license): free for
commercial use, no attribution required. Downloaded at 1600 px and converted to
WebP (1200 px wide) in `public/images/`.

| File | Used for | Source | Photographer |
| --- | --- | --- | --- |
| `recipe-peach-crumble.webp` | Peach crumble recipe | https://unsplash.com/photos/three-apricot-crumble-pastries-on-a-white-plate-zzw6GZg2ucw | Theo Lonic |
| `recipe-sardines-toast.webp` | Sardines on grilled bread recipe | https://unsplash.com/photos/a-plate-of-food-QWf5O-5Ousw | see source page |
| `recipe-clam-linguine.webp` | Clam linguine recipe | https://unsplash.com/photos/spaghetti-with-clams-and-herbs-on-a-white-plate-5kO64X4-Peo | Lee Milo |
| `recipe-yogurt-parfait.webp` | Yogurt, fruit and granola parfait recipe | https://unsplash.com/photos/strawberries-and-cookies-with-cream-filled-dessert-in-glass-cup-W2d_FskKkpw | amirali mirhashemian |
| `product-rice.webp` | Rice product (no packshot yet) | https://unsplash.com/photos/rice-in-bowl-xmuIgjuQG0M | see source page |
| `product-pasta.webp` | Pasta product (no packshot yet) | https://unsplash.com/photos/uncooked-three-pastas-SJ7uORconic | Heather Gill |

All other images in `public/images/` and `public/products/` come from the
client's own material (see `scripts/optimize-site-images.mjs` and
`scripts/optimize-product-images.mjs`).

Replace `product-rice.webp` and `product-pasta.webp` with real packshots when
the client supplies them: add an `image` to those products in
`src/content/catalog.ts` and the stock photo moves to the serving-photo slot.
