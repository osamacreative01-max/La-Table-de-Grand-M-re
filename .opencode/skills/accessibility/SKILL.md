---
name: Accessibility
description: Build and audit accessible interfaces - semantics, keyboard support, focus management, ARIA, contrast and reduced motion. Use when creating interactive UI or reviewing components.
---

# Accessibility

Target WCAG 2.2 AA. Accessibility is checked while building, not bolted on afterwards.

## Structure

- One `<main>` per page, plus `<header>` / `<nav>` / `<footer>` landmarks.
- `Skip to content` link as the first focusable element, visually hidden until focused.
- Headings descend without skipping (`h1` → `h2` → `h3`).
- Lists are real `<ul>` / `<ol>`. Menu items, nav links, and card collections are lists.
- `<button>` for actions, `<a>` / `<Link>` for navigation. Never a clickable `<div>`.

```tsx
<button type="button" onClick={close} aria-label="Close dialog">
  <X className="size-4" aria-hidden="true" />
</button>
```

## Keyboard

Every interactive element must be reachable with `Tab`, activated with `Enter`/`Space`, and dismissed with `Escape` where it applies. Radix primitives (shadcn) already implement roving focus, typeahead, and focus return — use them instead of hand-rolled menus, dialogs, tabs, or comboboxes.

Custom widgets need:

- Visible focus: never `outline-none` without a replacement ring.
- Focus trap inside modals; return focus to the trigger on close.
- No keyboard traps outside modals.

## Forms

- A real `<label htmlFor>` for every input. Placeholders are not labels.
- Group related radios/checkboxes with `<fieldset>` + `<legend>`.
- Errors are text, tied with `aria-describedby`, and announced (`role="alert"` or a live region).
- Required fields marked with `required` and explained in text, not by colour alone.

## Images and media

- Informative images: descriptive `alt`.
- Decorative images: `alt=""` so screen readers skip them.
- Never put essential text inside an image.
- Video with sound needs captions; autoplaying motion needs a pause control.

## Colour and motion

- Body text ≥ 4.5:1, large text ≥ 3:1, UI boundaries ≥ 3:1. Check both light and dark tokens.
- Never use colour as the only signal (error, status, required).
- Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Live regions

`aria-live="polite"` for status updates (cart added, form saved), `role="alert"` for errors. Keep the region in the DOM from the start — mounting a live region and filling it in the same tick often goes unannounced.

## Review checklist

1. Keyboard-only pass: can you complete every task with Tab / Enter / Escape?
2. Zoom to 200% and 320px width: no clipping, no horizontal scroll.
3. Screen-reader spot check on the main flow (NVDA or VoiceOver).
4. Contrast on all text and icons in both themes.
5. `npx @axe-core/cli http://localhost:3000` and fix every violation it reports.
