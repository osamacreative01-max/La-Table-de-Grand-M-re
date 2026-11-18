---
name: Forms and Validation
description: Build accessible forms with Server Actions, Zod validation, useActionState and field-level errors in Next.js. Use for reservations, contact, newsletter, or any input flow.
---

# Forms and validation

## The default pattern

Server Action + Zod + `useActionState` + shadcn `Field` components. No client-side form library required for straightforward forms.

```ts
// src/app/reservations/actions.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

export const reservationSchema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a reachable number").optional(),
  date: z.coerce.date().refine((d) => d > new Date(), "Pick a future date"),
  guests: z.coerce.number().int().min(1).max(12),
  notes: z.string().max(500).optional(),
});

export type ReservationState = {
  ok: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createReservation(
  _prev: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  const parsed = reservationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, errors: z.flattenError(parsed.error).fieldErrors };
  }
  await db.reservation.create({ data: parsed.data });
  revalidatePath("/reservations");
  return { ok: true, message: "Table booked. We'll confirm by email." };
}
```

```tsx
"use client";

import { useActionState } from "react";
import { createReservation, type ReservationState } from "./actions";

const initial: ReservationState = { ok: false };

export function ReservationForm() {
  const [state, action, pending] = useActionState(createReservation, initial);

  return (
    <form action={action} className="grid gap-6">
      <Field data-invalid={!!state.errors?.name}>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" name="name" aria-describedby="name-error" required />
        {state.errors?.name && <FieldError id="name-error">{state.errors.name[0]}</FieldError>}
      </Field>

      <Button type="submit" disabled={pending}>
        {pending ? "Booking…" : "Book a table"}
      </Button>
      {state.message && <p role="status">{state.message}</p>}
    </form>
  );
}
```

## Rules

- **Share one schema.** Export it from the action module and reuse it in the client for instant feedback. Server validation is the authority.
- **`Object.fromEntries(formData)`** for flat forms. For repeated fields use `formData.getAll()` and `z.array()`.
- **Coerce** numbers, dates, and checkboxes with `z.coerce.*` — form values are strings.
- **Return errors, don't throw.** Throwing renders the error boundary and loses the user's input.
- **`aria-describedby`** links each error to its input; keep `data-invalid` on the field wrapper so shadcn styles it.
- **Disable submit while pending** and announce the result with `role="status"`. Move focus to the first invalid field.
- **Honeypot + rate limit** on public forms. A hidden field plus a per-IP limit in the action is enough for a restaurant site.
- **Never trust hidden inputs** for prices, IDs, or permissions — re-derive them server-side.

## When to use react-hook-form

Use it only when the form is large, needs cross-field live validation, or uses complex field arrays. Install `react-hook-form` + `@hookform/resolvers` and wire `zodResolver(reservationSchema)`. Do not mix `useActionState` with `react-hook-form` in the same form.

## Progressive enhancement

`<form action={serverAction}>` works without JavaScript. Prefer it. Only reach for `onSubmit` + `fetch` when you need upload progress or a third-party embed.
