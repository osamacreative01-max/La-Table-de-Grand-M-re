# AGENTS.md

Guidance for AI agents working in this repository.

## Project

**La Table de Grand** — a restaurant website built with Next.js.

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first config in `src/app/globals.css`) |
| Components | shadcn/ui + Radix primitives, Lucide icons |
| Package manager | npm |
| Path alias | `@/*` → `src/*` |

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # type check
```

Always run `npm run lint` and `npx tsc --noEmit` before calling work done.

## Layout

```text
src/
├── app/                # routes, layouts, metadata files
│   ├── layout.tsx      # root layout
│   ├── page.tsx        # home
│   └── globals.css     # Tailwind theme + design tokens
├── components/
│   ├── ui/             # shadcn/ui primitives (generated, edit carefully)
│   └── ...             # feature components
└── lib/
    └── utils.ts        # cn() and shared helpers
```

## Conventions

- **Server-first.** Components are Server Components unless they need state, effects, or browser APIs. Add `"use client"` at the smallest possible leaf, never on a page or layout.
- **`params` and `searchParams` are Promises** in Next.js 16. Await them: `const { slug } = await params`.
- **`cookies()`, `headers()`, `draftMode()` are async.** Await them too.
- Middleware goes in `src/proxy.ts` (Next.js 16 renamed `middleware.ts` → `proxy.ts`).
- Mutations use Server Actions (`"use server"`), not API routes, unless the caller is external.
- Colours, spacing, radii, and fonts come from theme tokens in `globals.css`. Do not hardcode hex values or arbitrary sizes when a token exists.
- Compose class names with `cn()` from `@/lib/utils`. Conditional classes go through it, not string concatenation.
- Use `next/image` for every image and `next/link` for navigation.
- Images, menus, and other content live in `src/content/` or are fetched server-side. No large literals inside components.
- Import order: built-ins → external → `@/` aliases → relative → styles.
- File names are kebab-case; components are PascalCase; hooks are `use-*`.

## Design direction

Elegant, editorial fine-dining aesthetic: generous whitespace, a serif display face for headings, restrained palette (deep charcoal, warm cream, muted gold accent), subtle motion only. Never let animation block content or hurt readability.

## Accessibility

Semantic landmarks, a visible focus ring on every interactive element, `alt` text on every image, form inputs with real labels, and colour contrast of at least 4.5:1 for body text. Dark mode is driven by a `.dark` class on `<html>`.

## Skills

Detailed playbooks live in `.opencode/skills/`. Load the matching skill before doing substantial work:

| Skill | Use when |
| --- | --- |
| `nextjs-app-router` | Routing, layouts, data fetching, caching, server actions |
| `shadcn-ui` | Adding or customising shadcn/ui components |
| `tailwind-design-system` | Theme tokens, responsive layout, dark mode |
| `seo-metadata` | Metadata, sitemap, robots, structured data |
| `forms-and-validation` | Forms, validation, Server Action state |
| `accessibility` | Reviewing or building interactive UI |
| `motion-animations` | Any animation work |
| `testing` | Unit, component, and end-to-end tests |
| `git-workflow` | Commits, branches, pull requests |

## Agents

Specialised subagents live in `.opencode/agents/`: `ui-builder`, `code-reviewer`, `seo-auditor`, `performance-auditor`, and the primary `nextjs-architect`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
