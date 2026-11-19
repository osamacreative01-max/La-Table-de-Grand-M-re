"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  applyMachineTranslation,
  ensureGoogleTranslate,
  machineLanguages,
  resetTranslation,
} from "@/lib/translate";
import type { Lang } from "@/content/types";

export function LanguagePanel({
  lang,
  otherHref,
  labels,
  onSelect,
}: {
  lang: Lang;
  otherHref: string;
  labels: { language: string; translate: string; otherLanguages: string };
  onSelect?: () => void;
}) {
  const [active, setActive] = useState<string | null>(null);

  function choose(code: string) {
    setActive(code);
    applyMachineTranslation(code, lang);
    onSelect?.();
  }

  function reset() {
    setActive(null);
    resetTranslation(lang);
    onSelect?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <nav
        aria-label={labels.language}
        className="inline-flex w-fit items-center rounded-full border border-border/80 p-0.5"
      >
        {(
          [
            { code: "fr", label: "Français" },
            { code: "en", label: "English" },
          ] as const
        ).map((item) => {
          const isCurrent = item.code === lang;
          const className = cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            isCurrent
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          );

          return isCurrent ? (
            <span key={item.code} aria-current="true" className={className} lang={item.code}>
              {item.label}
            </span>
          ) : (
            // A plain anchor forces a full document load. The FR and EN trees
            // use different root layouts (<html lang="fr-CA"> vs "en-CA"), so a
            // client-side Link navigation would hydrate the wrong document shell.
            <a
              key={item.code}
              href={otherHref}
              hrefLang={item.code}
              onClick={onSelect}
              className={className}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div>
        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
          {labels.otherLanguages}
        </p>
        <ul className="mt-2 grid grid-cols-2 gap-1">
          {machineLanguages.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                lang={item.code}
                onClick={() => choose(item.code)}
                aria-pressed={active === item.code}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-xl border border-transparent px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                  active === item.code && "border-brand/40 bg-brand-soft/60",
                )}
              >
                {item.label}
                {active === item.code && (
                  <Check className="size-4 shrink-0 text-brand-foreground" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active && (
        <button
          type="button"
          onClick={reset}
          className="w-fit text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {lang === "fr" ? "Revenir au français" : "Back to English"}
        </button>
      )}
    </div>
  );
}

export function LanguageSwitcher({
  lang,
  otherHref,
  labels,
  align = "end",
}: {
  lang: Lang;
  otherHref: string;
  labels: { language: string; translate: string; otherLanguages: string };
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(code: string | null) {
    setActive(code);
    setOpen(false);

    if (code) applyMachineTranslation(code, lang);
    else resetTranslation(lang);
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    // Warm the widget up on first open so the choice applies immediately.
    if (next) ensureGoogleTranslate(lang);
  }

  return (
    <div ref={wrapper} className="relative flex items-center gap-1">
      <nav
        aria-label={labels.language}
        className="hidden items-center rounded-full border border-border/80 p-0.5 sm:flex"
      >
        {(["fr", "en"] as const).map((code) => {
          const isCurrent = code === lang;
          const className = cn(
            "rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors",
            isCurrent
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          );

          return isCurrent ? (
            <span key={code} aria-current="true" className={className} lang={code}>
              {code}
            </span>
          ) : (
            <a key={code} href={otherHref} hrefLang={code} className={className}>
              {code}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={labels.translate}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-border/80 px-2.5 py-1.5 text-[0.7rem] font-medium text-muted-foreground transition-colors",
          "hover:border-brand/60 hover:text-foreground",
          open && "border-brand/60 text-foreground",
        )}
      >
        <Globe className="size-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">{labels.translate}</span>
        <ChevronDown
          className={cn("size-3 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-[calc(100%+0.6rem)] z-50 w-60 overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-xl shadow-black/10",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          <p className="px-2.5 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            {labels.language}
          </p>
          <ul>
            {(
              [
                { code: "fr", label: "Français" },
                { code: "en", label: "English" },
              ] as const
            ).map((item) =>
              item.code === lang ? (
                <li key={item.code}>
                  <span
                    aria-current="true"
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-muted-foreground"
                  >
                    {item.label}
                    <Check className="size-4 text-brand" aria-hidden="true" />
                  </span>
                </li>
              ) : (
                <li key={item.code}>
                  <a
                    href={otherHref}
                    hrefLang={item.code}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>

          <div className="my-1 border-t border-border/70" />

          <p className="px-2.5 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            {labels.otherLanguages}
          </p>
          <ul>
            {machineLanguages.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  onClick={() => choose(item.code)}
                  lang={item.code}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted"
                >
                  {item.label}
                  {active === item.code && (
                    <Check className="size-4 text-brand" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
            {active && (
              <li className="mt-1 border-t border-border/70 pt-1">
                <button
                  type="button"
                  onClick={() => choose(null)}
                  className="w-full rounded-lg px-2.5 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted"
                >
                  {lang === "fr" ? "Français" : "English"}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
