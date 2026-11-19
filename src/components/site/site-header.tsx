"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/site/primitives";
import { LanguageSwitcher, LanguagePanel } from "@/components/site/language-switcher";
import { alternatePath } from "@/lib/alternate";
import { businessSubnav, nav, ui } from "@/content/copy";
import { paths } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { Lang } from "@/content/types";

const navHref: Record<string, Record<Lang, string>> = {
  home: paths.home,
  products: paths.products,
  recipes: paths.recipes,
  story: paths.story,
  business: paths.business,
  contact: paths.contact,
};

const subHref: Record<string, Record<Lang, string>> = {
  retailers: paths.retailers,
  wholesale: paths.wholesale,
  foodservice: paths.foodservice,
};

export function SiteHeader({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? `/${lang}`;
  const [open, setOpen] = useState(false);
  const t = ui[lang];

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const otherHref = alternatePath(pathname, lang === "fr" ? "en" : "fr");

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 shadow-sm shadow-black/[0.04] backdrop-blur-md">
      <Container size="wide">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link
            href={paths.home[lang]}
            className="rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            aria-label={lang === "fr" ? "La Table de Grand-Mère — Accueil" : "La Table de Grand-Mère — Home"}
          >
            <Logo />
          </Link>

          <nav aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav[lang].map((item) => {
                const href = navHref[item.key][lang];
                const active = pathname === href;
                const hasChildren = item.key === "business";

                return (
                  <li key={item.key} className={cn("relative", hasChildren && "group")}>
                    <Link
                      href={href}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-150",
                        active
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                      )}
                    >
                      {item.label}
                      {hasChildren && (
                        <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
                      )}
                    </Link>

                    {hasChildren && (
                      <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <ul className="mt-2 overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-xl shadow-black/10">
                          {businessSubnav[lang].map((child) => (
                            <li key={child.key}>
                              <Link
                                href={subHref[child.key][lang]}
                                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher
              lang={lang}
              otherHref={otherHref}
              labels={{ language: t.language, translate: t.translate, otherLanguages: t.otherLanguages }}
            />

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.close : t.openMenu}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 text-foreground transition-colors hover:border-brand/60 lg:hidden"
            >
              {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </Container>

      {open &&
        createPortal(
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={lang === "fr" ? "Navigation mobile" : "Mobile navigation"}
            className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
              <Link
                href={paths.home[lang]}
                onClick={() => setOpen(false)}
                className="rounded-lg"
              >
                <Logo />
              </Link>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 text-foreground transition-colors hover:border-brand/60"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <Container className="flex min-h-full flex-col gap-8 py-8">
                <nav aria-label={lang === "fr" ? "Navigation mobile" : "Mobile navigation"}>
                  <ul className="flex flex-col divide-y divide-border/70 border-y border-border/70">
                    {nav[lang].map((item) => (
                      <li key={item.key}>
                        <Link
                          href={navHref[item.key][lang]}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-3.5 font-heading text-xl"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div>
                  <p className="mb-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {t.business}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {businessSubnav[lang].map((child) => (
                      <li key={child.key}>
                        <Link
                          href={subHref[child.key][lang]}
                          onClick={() => setOpen(false)}
                          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2.5 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {t.language}
                  </p>
                  <LanguagePanel
                    lang={lang}
                    otherHref={otherHref}
                    labels={{ language: t.language, translate: t.translate, otherLanguages: t.otherLanguages }}
                    onSelect={() => setOpen(false)}
                  />
                </div>

                <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
                  La Table de Grand-Mère ·{" "}
                  {lang === "fr" ? "Le goût de se retrouver." : "The Taste of Coming Together."}
                </p>
              </Container>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
