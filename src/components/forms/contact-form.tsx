"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldShell, errorText, inputClass, textareaClass } from "@/components/forms/form-parts";
import { submitContact, type FormState } from "@/app/actions";
import { contactPage, forms } from "@/content/copy";
import type { Lang } from "@/content/types";

const initial: FormState = { status: "idle" };

export function ContactForm({ lang }: { lang: Lang }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const copy = forms[lang].contact;
  const page = contactPage[lang];

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-brand/40 bg-brand-soft/60 p-6"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-foreground" aria-hidden="true" />
        <p className="text-sm leading-relaxed">{page.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <FieldShell id="contact-name" label={copy.name} error={errorText(lang, state.errors?.name)}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? "contact-name-error" : undefined}
          className={inputClass}
        />
      </FieldShell>

      <FieldShell id="contact-email" label={copy.email} error={errorText(lang, state.errors?.email)}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? "contact-email-error" : undefined}
          className={inputClass}
        />
      </FieldShell>

      <FieldShell id="contact-message" label={copy.message} error={errorText(lang, state.errors?.message)}>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "contact-message-error" : undefined}
          className={textareaClass}
        />
      </FieldShell>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="xl" disabled={pending}>
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {page.cta}
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
            {lang === "fr"
              ? "Une erreur est survenue. Veuillez réessayer."
              : "Something went wrong. Please try again."}
          </p>
        )}
      </div>
    </form>
  );
}
