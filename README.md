# La Table de Grand

A restaurant website built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and shadcn/ui.

## Requirements

- Node.js 20.9+ (developed on Node 24)
- npm 11+

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

## Environment

Copy `.env.example` to `.env.local` and fill in what you need. `NEXT_PUBLIC_SITE_URL` drives canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt`, so set it in production.

## Project structure

```text
src/
├── app/                 # routes, layouts, metadata routes
│   ├── layout.tsx       # root layout: fonts, metadata
│   ├── page.tsx         # home
│   ├── globals.css      # Tailwind v4 theme tokens
│   ├── sitemap.ts       # /sitemap.xml
│   └── robots.ts        # /robots.txt
├── components/ui/       # shadcn/ui primitives
└── lib/
    ├── site-config.ts   # name, contact, hours, navigation
    └── utils.ts         # cn()
```

## Design tokens

Everything visual is a token in `src/app/globals.css`: `--background`, `--foreground`, `--brand` (muted gold), `--radius`, and the `--font-*` families wired from `next/font` in the root layout. Change the token, not the component. Dark mode is a `.dark` class on `<html>`.

## Working with AI agents

This repo ships an OpenCode setup:

- `AGENTS.md` — project conventions, read automatically.
- `.opencode/skills/` — nine task playbooks (App Router, shadcn, Tailwind, SEO, forms, accessibility, motion, testing, git).
- `.opencode/agents/` — `nextjs-architect` (primary), plus `ui-builder`, `code-reviewer`, `seo-auditor` and `performance-auditor` subagents.
- `.opencode/opencode.json` — project config.

## Adding components

```bash
npx shadcn@latest add dialog select tabs
```

If `npm install` inside the CLI fails with `EALLOWSCRIPTS`, run the CLI directly:

```bash
node node_modules/shadcn/dist/index.js add dialog
```

## Deploy

Optimised for Vercel. Set `NEXT_PUBLIC_SITE_URL` and any data-source secrets in the project environment before the first deploy.
