"use client";

import { useActionState } from "react";
import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FieldShell,
  errorText,
  inputClass,
  selectClass,
  textareaClass,
} from "@/components/forms/form-parts";
import { submitBusinessEnquiry, type FormState } from "@/app/actions";
import { forms } from "@/content/copy";
import { categories } from "@/content/catalog";
import type { Lang } from "@/content/types";

const initial: FormState = { status: "idle" };

export function BusinessForm({ lang }: { lang: Lang }) {
  const [state, action, pending] = useActionState(submitBusinessEnquiry, initial);
  const copy = forms[lang].business;
  const err = (field: string) => errorText(lang, state.errors?.[field]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-brand/40 bg-brand-soft/60 p-6"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-foreground" aria-hidden="true" />
        <p className="text-sm leading-relaxed">{copy.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="lang" value={lang} />

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell
          id="business-type"
          label={copy.businessType}
          error={err("businessType")}
          className="sm:col-span-2"
        >
          <div className="relative">
            <select
              id="business-type"
              name="businessType"
              required
              defaultValue=""
              aria-invalid={Boolean(state.errors?.businessType)}
              className={selectClass}
            >
              <option value="" disabled>
                {copy.businessTypeRequired}
              </option>
              {copy.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </FieldShell>

        <FieldShell id="business-name" label={copy.name} error={err("name")}>
          <input
            id="business-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.errors?.name)}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell id="business-company" label={copy.company} error={err("company")}>
          <input
            id="business-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={Boolean(state.errors?.company)}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell id="business-email" label={copy.email} error={err("email")}>
          <input
            id="business-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.errors?.email)}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell id="business-phone" label={copy.phone} optional={copy.optional} error={err("phone")}>
          <input
            id="business-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(state.errors?.phone)}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell
          id="business-city"
          label={copy.city}
          error={err("city")}
          className="sm:col-span-2"
        >
          <input
            id="business-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            aria-invalid={Boolean(state.errors?.city)}
            className={inputClass}
          />
        </FieldShell>
      </div>

      <fieldset
        aria-invalid={Boolean(state.errors?.products)}
        className="rounded-2xl border border-border/80 bg-secondary/40 p-5"
      >
        <legend className="px-1 text-sm font-medium">{copy.products}</legend>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {categories.map((category) => (
            <li key={category.key}>
              <label className="flex cursor-pointer items-start gap-2.5 rounded-lg px-1.5 py-1 text-sm transition-colors hover:bg-background/60">
                <input
                  type="checkbox"
                  name="products"
                  value={category.key}
                  className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
                />
                <span>{category.name[lang]}</span>
              </label>
            </li>
          ))}
        </ul>
        {state.errors?.products && (
          <p role="alert" className="mt-3 text-xs font-medium text-destructive">
            {err("products")}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-3">
        <FieldShell id="business-pack" label={copy.packSizes} optional={copy.optional} error={err("packSizes")}>
          <input id="business-pack" name="packSizes" type="text" className={inputClass} />
        </FieldShell>

        <FieldShell id="business-quantity" label={copy.quantity} optional={copy.optional} error={err("quantity")}>
          <input id="business-quantity" name="quantity" type="text" className={inputClass} />
        </FieldShell>

        <FieldShell id="business-frequency" label={copy.frequency} optional={copy.optional} error={err("frequency")}>
          <input id="business-frequency" name="frequency" type="text" className={inputClass} />
        </FieldShell>
      </div>

      <FieldShell id="business-message" label={copy.message} optional={copy.optional} error={err("message")}>
        <textarea id="business-message" name="message" className={textareaClass} />
      </FieldShell>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="xl" disabled={pending}>
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {copy.submit}
        </Button>

        {state.status === "unconfigured" && (
          <p role="status" className="text-xs text-muted-foreground">
            {lang === "fr"
              ? "Formulaire prêt : l'envoi courriel sera activé avant la mise en ligne."
              : "Form is ready: email delivery will be enabled before launch."}
          </p>
        )}
        {state.status === "error" && !state.errors && (
          <p role="alert" className="text-xs font-medium text-destructive">
            {copy.error}
          </p>
        )}
      </div>
    </form>
  );
}
