---
name: Tailwind Design System
description: Work with Tailwind CSS v4 theme tokens, responsive layout, dark mode and typography in this project. Use when styling, adding design tokens, or building layout.
---

# Tailwind CSS v4 design system

Tailwind v4 is configured in CSS, not JavaScript. There is no `tailwind.config.js`; tokens live in `src/app/globals.css`.

## How tokens work

```css
@import "tailwindcss";

/* Utility namespace: --color-* becomes bg-*, text-*, border-*, ring-* */
@theme inline {
  --color-background: var(--background);
  --color-brand: var(--brand);
  --font-heading: var(--font-display);
  --radius-lg: var(--radius);
}

/* Raw values, swappable per theme */
:root {
  --background: oklch(0.98 0.008 85);
  --brand: oklch(0.55 0.09 75);
  --font-display: var(--font-playfair);
  --radius: 0.5rem;
}
```

- `@theme` defines utilities. `@theme inline` keeps the reference so a `.dark` override flows through.
- `:root` / `.dark` hold the actual values. Never hardcode a hex in a component; add a token.
- Naming: `--color-<name>` → `bg-<name>`, `text-<name>`, `border-<name>`. `--radius-*`, `--font-*`, `--spacing-*`, `--shadow-*` follow the same pattern.

## Dark mode

```css
@custom-variant dark (&:is(.dark *));
```

The `.dark` class sits on `<html>`. Toggle it from a small client component, persist the choice in a cookie, and read the cookie in the root layout so the first paint is already correct.

```tsx
<html lang="en" className={theme === "dark" ? "dark" : undefined}>
```

Never rely on `prefers-color-scheme` alone — it causes a flash and ignores user choice.

## Layout patterns

- Use `max-w-*` + `mx-auto` + responsive `px-*` for page shells, wrapped in a shared component, not repeated per page.
- `flex` for one dimension, `grid` for two. `gap-*` over margins between siblings.
- Use `size-*` for square icons and images. `aspect-video`, `aspect-square` for media.
- Container queries (`@container`, `@md:grid-cols-2`) fit reusable cards better than viewport breakpoints.
- Prefer `min-h-dvh` over `min-h-screen` on mobile.

## Typography

- Set the body font on `<html>` in `@layer base`, then use `font-heading` only where intended.
- Load fonts with `next/font` and expose them as CSS variables (`--font-playfair`); never `<link>` Google Fonts.
- Use `text-balance` on headings and `text-pretty` on prose paragraphs.

## Class composition

```tsx
import { cn } from "@/lib/utils";
<div className={cn("rounded-lg border p-6", isFeatured && "border-brand bg-brand/5", className)} />
```

`cn()` (clsx + tailwind-merge) resolves conflicts, so a caller's `className` can override a default. Never concatenate class strings manually.

## Common mistakes

| Mistake | Fix |
| --- | --- |
| Adding `tailwind.config.ts` | Tokens belong in `globals.css` |
| `bg-[#c9a227]` | `bg-brand` after adding a token |
| Arbitrary `p-[17px]` | Use the spacing scale |
| `!important` overrides | Fix the conflicting class via `cn()` |
| `dark:bg-neutral-900` everywhere | Override tokens in `.dark` once |
