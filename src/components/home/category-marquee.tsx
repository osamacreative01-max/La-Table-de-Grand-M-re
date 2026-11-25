import Link from "next/link";
import { categories } from "@/content/catalog";
import { categoryPath } from "@/lib/routes";
import type { Lang } from "@/content/types";

/** Endless, slow-moving strip of the product ranges. Pauses on hover and focus. */
export function CategoryMarquee({ lang }: { lang: Lang }) {
  const row = (copy: number) => (
    <ul
      aria-hidden={copy > 0 || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {categories.map((category) => (
        <li key={category.key} className="flex shrink-0 items-center gap-10">
          <Link
            href={categoryPath(lang, category.slug[lang])}
            tabIndex={copy > 0 ? -1 : undefined}
            className="rounded-sm font-heading text-xl italic text-ink-foreground/85 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-2xl"
          >
            {category.name[lang]}
          </Link>
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      aria-label={lang === "fr" ? "Nos gammes" : "Our ranges"}
      className="group relative overflow-hidden border-y border-ink-foreground/10 bg-ink py-5"
    >
      <div className="marquee flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {row(0)}
        {row(1)}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
    </nav>
  );
}
