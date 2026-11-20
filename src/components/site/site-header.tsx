"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
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

type Labels = { language: string; translate: string; otherLanguages: string };

function isActive(pathname: string, href: string, key: string) {
  if (!pathname) return false;
  return pathname === href || (key !== "home" && pathname.startsWith(`${href}/`));
}

/**
 * The link list itself is pathname-free, so it can render in the static shell
 * while the live pathname arrives from `LiveNav`.
 */
function NavLinks({ lang, pathname }: { lang: Lang; pathname: string }) {
  return (
    <ul className="flex items-center justify-center gap-0.5">
      {nav[lang].map((item) => {
        const href = navHref[item.key][lang];
        const active = isActive(pathname, href, item.key);
        const hasChildren = item.key === "business";

        return (
          <li key={item.key} className={cn("relative", hasChildren && "group")}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[0.78rem] font-medium transition-colors xl:px-2.5 xl:text-[0.8125rem]",
                "after:pointer-events-none after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 xl:after:inset-x-2.5",
                active
                  ? "text-primary after:scale-x-100"
                  : "text-foreground/70 hover:text-foreground hover:after:scale-x-100 hover:after:bg-primary/40",
              )}
            >
              {item.label}
              {hasChildren && (
                <ChevronDown
                  className="size-3 opacity-60 transition-transform group-hover:rotate-180"
                  aria-hidden="true"
                />
              )}
            </Link>

            {hasChildren && (
              <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <ul className="overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-soft">
                  {businessSubnav[lang].map((child) => (
                    <li key={child.key}>
                      <Link
                        href={subHref[child.key][lang]}
                        className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.8125rem] text-foreground/75 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {child.label}
                        <ArrowRight className="size-3.5 opacity-40" aria-hidden="true" />
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
  );
}

/** Reads the pathname; suspends while a dynamic route shell is being prerendered. */
function LiveNav({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "";
  return <NavLinks lang={lang} pathname={pathname} />;
}

function LiveLanguage({ lang, labels }: { lang: Lang; labels: Labels }) {
  const pathname = usePathname() ?? `/${lang}`;
  const otherHint = lang === "fr" ? "en" : "fr";
  return (
    <LanguageSwitcher lang={lang} otherHref={alternatePath(pathname, otherHint)} labels={labels} />
  );
}

function MobileMenu({
  lang,
  labels,
  onClose,
}: {
  lang: Lang;
  labels: Labels;
  onClose: () => void;
}) {
  const pathname = usePathname() ?? `/${lang}`;
  const otherHref = alternatePath(pathname, lang === "fr" ? "en" : "fr");

  return createPortal(
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label={lang === "fr" ? "Navigation mobile" : "Mobile navigation"}
      className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <Link
          href={paths.home[lang]}
          onClick={onClose}
          aria-label={lang === "fr" ? "La Table de Grand-Mère — Accueil" : "La Table de Grand-Mère — Home"}
          className="rounded-md"
        >
          <Logo />
        </Link>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label={ui[lang].close}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <Container className="flex min-h-full flex-col gap-8 py-8">
          <nav aria-label={lang === "fr" ? "Navigation mobile" : "Mobile navigation"}>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {nav[lang].map((item) => (
                <li key={item.key}>
                  <Link
                    href={navHref[item.key][lang]}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 font-heading text-[1.375rem] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                    <ArrowRight className="size-4 text-primary/60" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary">
              {ui[lang].business}
            </p>
            <ul className="flex flex-col gap-1">
              {businessSubnav[lang].map((child) => (
                <li key={child.key}>
                  <Link
                    href={subHref[child.key][lang]}
                    onClick={onClose}
                    className="block py-1.5 text-[0.9375rem] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={paths.contact[lang]}
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
          >
            {nav[lang].find((item) => item.key === "contact")?.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>

          <div>
            <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary">
              {labels.language}
            </p>
            <LanguagePanel
              lang={lang}
              otherHref={otherHref}
              labels={labels}
              onSelect={onClose}
            />
          </div>

          <p className="mt-auto text-[0.8125rem] leading-relaxed text-muted-foreground">
            La Table de Grand-Mère ·{" "}
            {lang === "fr" ? "Le goût de se retrouver." : "The Taste of Coming Together."}
          </p>
        </Container>
      </div>
    </div>,
    document.body,
  );
}

export function SiteHeader({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const t = ui[lang];
  const labels: Labels = {
    language: t.language,
    translate: t.translate,
    otherLanguages: t.otherLanguages,
  };
  const otherLangHome = paths.home[lang === "fr" ? "en" : "fr"];

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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <Container size="wide">
        <div className="grid h-[72px] grid-cols-[1fr_auto] items-center gap-6 lg:h-20 lg:grid-cols-[auto_1fr_auto]">
          {/* Logo */}
          <Link
            href={paths.home[lang]}
            className="w-fit rounded-md transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            aria-label={lang === "fr" ? "La Table de Grand-Mère — Accueil" : "La Table de Grand-Mère — Home"}
          >
            <Logo priority />
          </Link>

          {/* Centered navigation */}
          <nav
            aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}
            className="hidden lg:block"
          >
            <Suspense fallback={<NavLinks lang={lang} pathname="" />}>
              <LiveNav lang={lang} />
            </Suspense>
          </nav>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Suspense
              fallback={
                <LanguageSwitcher lang={lang} otherHref={otherLangHome} labels={labels} />
              }
            >
              <LiveLanguage lang={lang} labels={labels} />
            </Suspense>

            <Link
              href={paths.contact[lang]}
              className="hidden h-10 items-center gap-2 rounded-full bg-primary px-5 text-[0.8125rem] font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9d2b22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:inline-flex lg:hidden xl:inline-flex"
            >
              {nav[lang].find((item) => item.key === "contact")?.label}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.close : t.openMenu}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </Container>

      {open && <MobileMenu lang={lang} labels={labels} onClose={() => setOpen(false)} />}
    </header>
  );
}
