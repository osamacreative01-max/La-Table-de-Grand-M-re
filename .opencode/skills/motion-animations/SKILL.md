---
name: Motion Animations
description: Animate UI with Motion for React (the motion package, formerly framer-motion) - entrance reveals, stagger, gestures, page transitions. Use for any animation or interaction polish.
---

# Motion for React

Package: `motion`. Import from `motion/react`. `framer-motion` is the old name — never install or import it in a new project.

```bash
npm install motion
```

## Client boundary

`motion.*` components use hooks, so the file must be a Client Component. Keep the animated piece small and wrap static content:

```tsx
"use client";
import { motion } from "motion/react";

export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

## Core API

| Need | API |
| --- | --- |
| One-shot entrance | `initial` + `animate` |
| Animate on scroll into view | `whileInView` + `viewport={{ once: true }}` |
| Hover / press | `whileHover`, `whileTap` |
| Sequenced children | `variants` + `staggerChildren` on the parent |
| Mount/unmount transitions | `AnimatePresence` + `exit` |
| Shared element between views | `layoutId` + `LayoutGroup` |
| Follow the pointer | `useMotionValue` + `useSpring` + `useTransform` |
| Scroll progress | `useScroll` + `useTransform` |

## Stagger

```tsx
const list = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

<motion.ul variants={list} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {dishes.map((d) => (
    <motion.li key={d.id} variants={item}>{d.name}</motion.li>
  ))}
</motion.ul>
```

## Rules for this project

- **Subtle and fast.** 200–600ms for UI, max 24–32px travel. A fine-dining site should feel calm, not bouncy.
- **Never hide content until JavaScript runs.** With `whileInView`, content that never enters the viewport must still be readable. Keep the initial state visually close to the final one for critical text.
- **One reveal per section.** Animating every element makes the page feel slow.
- **Respect reduced motion.** `useReducedMotion()` from `motion/react`, or the CSS media query in the `accessibility` skill:

```tsx
const reduce = useReducedMotion();
<motion.div initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} />
```

- **Don't animate layout-affecting properties** (`width`, `height`, `top`) on scroll. Prefer `transform` and `opacity`; use `layout` only for deliberate shared-element moves.
- **Animate the wrapper, not the text node**, so text stays selectable and accessible.
- Lazy-load below-the-fold animated sections with `next/dynamic` when they pull in heavy code.

## Gotchas

- `AnimatePresence` must stay mounted while children exit, and each child needs a stable `key`.
- A `motion` component inside a Server Component file throws — move it to its own `"use client"` file.
- Passing `style` motion values into a Server Component is impossible; keep the whole chain client-side.
- `viewport={{ once: true }}` prevents re-animating on every scroll pass; default to it.
