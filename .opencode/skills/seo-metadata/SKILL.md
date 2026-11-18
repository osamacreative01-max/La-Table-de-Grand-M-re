---
name: SEO and Metadata
description: Add metadata, Open Graph images, sitemaps, robots rules and JSON-LD structured data to Next.js App Router pages. Use for any SEO, social sharing, or page title work.
---

# SEO, metadata and structured data

## Metadata API

Static metadata for a page or layout:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | La Table de Grand",
  description: "Seasonal French plates, wood-fired and served in the heart of the city.",
  alternates: { canonical: "/menu" },
  openGraph: { title: "Menu", description: "…", images: ["/og/menu.png"], type: "website" },
  twitter: { card: "summary_large_image" },
};
```

Dynamic metadata from route params:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dish = await getDish(slug);
  return { title: `${dish.name} | La Table de Grand`, description: dish.summary };
}
```

- Set `metadataBase` once in `src/app/layout.tsx` (`new URL("https://example.com")`) so relative URLs resolve.
- Use a `title.template` (`"%s | La Table de Grand"`) in the root layout and plain titles in children.
- Never duplicate a title across pages; each route owns its own.

## File-based metadata

Place these in `src/app` — Next.js serves them automatically:

| File | Output |
| --- | --- |
| `favicon.ico` | `/favicon.ico` |
| `icon.png` | `<link rel="icon">` |
| `apple-icon.png` | Apple touch icon |
| `opengraph-image.png` | Default OG image (or `.tsx` to render one) |
| `sitemap.ts` | `/sitemap.xml` |
| `robots.ts` | `/robots.txt` |
| `manifest.ts` | `/manifest.webmanifest` |

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  return ["", "/menu", "/about", "/reservations"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
```

```ts
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: "https://example.com/sitemap.xml",
  };
}
```

Prefer the file convention over hand-written `sitemap.xml` so routes stay in sync.

## Structured data (JSON-LD)

Emit a `<script type="application/ld+json">` from a Server Component. Escape the payload:

```tsx
const json = JSON.stringify(schema).replace(/</g, "\\u003c");

export function JsonLd({ schema }: { schema: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
```

Useful types for a restaurant: `Restaurant` (name, address, telephone, openingHoursSpecification, servesCuisine, priceRange), `Menu` + `MenuItem`, `BreadcrumbList`, and `Review` only when genuine. Validate at <https://validator.schema.org> and the Rich Results Test.

## Content rules

- One `<h1>` per page, descriptive and unique. Headings descend in order.
- `alt` text describes the image's purpose; decorative images use `alt=""`.
- Internal links use descriptive anchor text — never "click here".
- Keep titles ≤ 60 characters, descriptions 120–160.
- Add `robots: { index: false }` to admin, draft, and thank-you routes.
