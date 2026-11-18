---
name: Next.js App Router
description: Build routes, layouts, data fetching, caching and Server Actions in the Next.js 16 App Router. Use for any routing, rendering, or server-side data work.
---

# Next.js App Router (v16)

## Server vs Client

Everything under `src/app` is a Server Component. Add `"use client"` only on the smallest leaf that needs interactivity, because the directive makes that whole module and its imports client-side.

| Need | Where it lives |
| --- | --- |
| Fetch data, read secrets, query a database | Server Component |
| `useState`, `useEffect`, event handlers, refs | Client Component |
| `window`, `document`, `localStorage` | Client Component, inside `useEffect` |
| Context provider | Client Component wrapping children from a server parent |

Pass only serialisable props across the boundary. Server Components can be passed to Client Components as `children` or as a slot prop — that keeps the server work on the server.

```tsx
// app/page.tsx (server)
export default async function Page() {
  const menu = await getMenu();
  return <MenuList items={menu} />; // MenuList is a client component
}
```

## Routing files

| File | Purpose |
| --- | --- |
| `page.tsx` | Route UI, makes the segment publicly routable |
| `layout.tsx` | Shared shell, preserves state across navigation, must render `children` |
| `template.tsx` | Like a layout but remounts on every navigation |
| `loading.tsx` | Suspense fallback for the segment |
| `error.tsx` | Error boundary, must be a Client Component, receives `reset` |
| `not-found.tsx` | Rendered by `notFound()` |
| `route.ts` | API endpoint (`export async function GET`) |
| `default.tsx` | Fallback for parallel routes |

- Route groups: `(marketing)` groups without adding a URL segment.
- Dynamic segments: `[slug]`, catch-all `[...slug]`, optional `[[...slug]]`.
- Parallel routes: `@modal`; intercepting routes: `(.)photo`, `(..)photo`.
- Private folders (`_components`) are excluded from routing.

## Next.js 16 async APIs

This is the most common source of type errors. These are all Promises now:

```tsx
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { q } = await searchParams;
}
```

```ts
import { cookies, headers, draftMode } from "next/headers";
const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
const value = cookieStore.get("theme")?.value;
```

Middleware is `src/proxy.ts` in Next.js 16 (`middleware.ts` is the legacy name):

```ts
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next|favicon.ico).*)"] };
```

## Data fetching

Fetch on the server, as close to the component that needs the data as possible. React `cache()` deduplicates repeated requests within one render pass:

```ts
import { cache } from "react";
export const getDish = cache(async (slug: string) => db.dish.findUnique({ where: { slug } }));
```

Stream slow sections with Suspense instead of blocking the whole page:

```tsx
<Suspense fallback={<MenuSkeleton />}>
  <MenuSection />
</Suspense>
```

### Caching cheat sheet

| Goal | Tool |
| --- | --- |
| Re-run a fetch at most every N seconds | `fetch(url, { next: { revalidate: 60 } })` |
| Always fresh | `fetch(url, { cache: "no-store" })` |
| Tag a fetch, purge it later | `fetch(url, { next: { tags: ["menu"] } })` |
| Purge after a mutation | `revalidatePath("/menu")` or `revalidateTag("menu")` |
| Cache an expensive function | `"use cache"` + `cacheLife()` + `cacheTag()` (needs `cacheComponents: true` in `next.config.ts`) |

`"use cache"` requires `cacheComponents: true` in `next.config.ts`. This project has it enabled — verify before relying on it, and prefer explicit `revalidate` values when a single fetch is all you need.

## Server Actions

```ts
"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({ name: z.string().min(1), guests: z.coerce.number().min(1) });

export async function createReservation(_prev: unknown, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, errors: parsed.error.flatten().fieldErrors };
  await db.reservation.create({ data: parsed.data });
  revalidatePath("/reservations");
  return { ok: true };
}
```

Rules:

- Validate and authorise on the server, always. Client validation is UX only.
- Return plain serialisable objects; throw only for genuinely unexpected failures.
- Call `revalidatePath` / `revalidateTag` for anything you cached.
- Actions are public HTTP endpoints — treat every argument as untrusted.

## Metadata and static assets

Export `metadata` or `generateMetadata` from pages and layouts; see the `seo-metadata` skill. Use `next/image` with explicit `width`/`height` or `fill` plus a sized parent, and `next/font` for fonts so there is no layout shift.

## Performance defaults

- Keep `"use client"` leaves small and few.
- Dynamic-import heavy widgets: `next/dynamic` with a `loading` fallback.
- Prefer `loading.tsx` + Suspense over full-page spinners.
- Check the build output for unintended static → dynamic regressions.
