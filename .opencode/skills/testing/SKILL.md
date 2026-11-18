---
name: Testing
description: Write unit, component and end-to-end tests for a Next.js app with Vitest, React Testing Library and Playwright. Use when adding tests, fixing a bug with a regression test, or setting up CI checks.
---

# Testing

Three layers, cheapest first. Most value comes from a few end-to-end tests on the money paths (menu → reservation) plus component tests on interactive pieces.

## Setup

```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom vite-tsconfig-paths
npm i -D @playwright/test && npx playwright install chromium
```

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"], globals: true },
});
```

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

Add scripts: `"test": "vitest"`, `"test:run": "vitest run"`, `"test:e2e": "playwright test"`.

## What to test

| Layer | Tool | Target |
| --- | --- | --- |
| Pure logic (formatting, pricing, validation) | Vitest | `src/lib/**` |
| Interactive components | Vitest + RTL | client components, forms, menus |
| Flows | Playwright | reservation, navigation, 404 |

Do not unit-test that React renders text — test behaviour and outcomes.

## Component test

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReservationForm } from "./reservation-form";

it("shows a validation error for a missing name", async () => {
  const user = userEvent.setup();
  render(<ReservationForm />);
  await user.click(screen.getByRole("button", { name: /book a table/i }));
  expect(await screen.findByText(/tell us your name/i)).toBeInTheDocument();
});
```

Query by role and accessible name first (`getByRole`), then label/placeholder, and only then `data-testid` — a test that queries by role also proves the UI is accessible.

## Server Actions in tests

Server Actions are plain async functions. Call them directly with a `FormData` and assert the returned state — no network, no mocking framework:

```ts
const fd = new FormData();
fd.set("guests", "4");
const result = await createReservation({ ok: false }, fd);
expect(result.errors?.date).toBeDefined();
```

Mock the data layer (`vi.mock("@/lib/db")`), not the action.

## End-to-end

```ts
import { test, expect } from "@playwright/test";

test("guest can reach the reservation form from the home page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /reserve/i }).click();
  await expect(page).toHaveURL(/\/reservations/);
  await expect(page.getByRole("heading", { name: /book a table/i })).toBeVisible();
});
```

Run Playwright against a real server: `webServer: { command: "npm run build && npm run start", url: "http://localhost:3000" }` in `playwright.config.ts`.

## Debugging a bug

1. Reproduce it as a failing test first.
2. Fix the code, not the test.
3. Keep the test as the regression guard.

Flaky timing: use `findBy*` and Playwright auto-waiting instead of `sleep`.
