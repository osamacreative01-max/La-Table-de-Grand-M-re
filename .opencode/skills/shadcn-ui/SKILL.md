---
name: shadcn/ui
description: Add, customise and compose shadcn/ui components in a Tailwind v4 Next.js project. Use before writing any primitives, buttons, dialogs, forms, or navigation menus.
---

# shadcn/ui

shadcn/ui copies component source into `src/components/ui`, so this project owns and edits those files. It is not a dependency you upgrade — it is code you maintain.

## Config

`components.json` at the project root holds the paths and style:

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": { "config": "", "css": "src/app/globals.css", "baseColor": "neutral", "cssVariables": true },
  "iconLibrary": "lucide",
  "aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "hooks": "@/hooks", "lib": "@/lib" }
}
```

`tailwind.config` is empty because Tailwind v4 reads `globals.css`.

## Adding components

```bash
npx shadcn@latest add button card dialog input label select textarea tabs sheet separator badge
npx shadcn@latest add --all           # everything
npx shadcn@latest add dialog --overwrite   # re-pull a component you broke
npx shadcn@latest add --diff dialog   # show what upstream changed
```

Only add what the page needs. Every added component is code the project must maintain.

## Composing

Import from the alias, not from a package:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
```

`Button` uses `asChild` to lend its styling to a link:

```tsx
<Button asChild size="lg">
  <Link href="/reservations">Book a table</Link>
</Button>
```

`cn()` merges classes and resolves Tailwind conflicts, so a prop can override defaults:

```tsx
<Button className="w-full md:w-auto">Reserve</Button>
```

For a new variant, extend the CVA definition inside `components/ui/button.tsx` rather than fighting it with `className`.

## Theming

All colours resolve to CSS variables declared in `globals.css`. To restyle the whole app, change the tokens there — never patch colours into individual components.

```css
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --radius-lg: var(--radius);
}
```

Add a custom token, then use it as a normal utility (`bg-brand`, `text-brand-foreground`).

## Dark mode

The project uses the class strategy: a `.dark` class on `<html>`. Toggle it from a client component and persist the choice in a cookie so the server can render the right class on first paint. Do not use `prefers-color-scheme` alone — it flashes.

## Conventions

- Never edit `components/ui/*` for one-off page needs; wrap the primitive in a feature component instead.
- Keep Radix behaviour intact: `Dialog` needs `DialogTitle` for screen readers, `Select` needs item values, `Sheet` needs a side.
- Icons come from `lucide-react`, sized with `className="size-4"`.
- Client-only components (`dialog`, `dropdown-menu`, `sheet`, `tabs` with state, `sonner`) pull `"use client"` in themselves — just don't call them from a Server Component with function props.
- Add `Toaster` from `sonner` once in the root layout if you use toasts.
