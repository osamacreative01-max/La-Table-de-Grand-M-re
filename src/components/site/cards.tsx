import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChefHat, Clock } from "lucide-react";
import { FoodIllustration, MediaFrame, toneStyles } from "@/components/site/media-frame";
import { cn } from "@/lib/utils";
import type { Category, Product, Tone } from "@/content/types";

export function CategoryCard({
  category,
  href,
  lang,
  label,
  index,
  className,
  wide = false,
}: {
  category: Category;
  href: string;
  lang: "fr" | "en";
  label: string;
  index?: number;
  className?: string;
  wide?: boolean;
}) {
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  if (wide) {
    return (
      <Link
        href={href}
        className={cn(
          "group grid overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-300",
          "md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
          "hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_28px_60px_-30px_rgba(72,48,28,0.55)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        )}
      >
        <div className="overflow-hidden">
          <MediaFrame
            src={category.image}
            alt={category.caption[lang]}
            tone={category.tone}
            ratio="3/2"
            rounded="rounded-none"
            sizes="(min-width: 768px) 45vw, 100vw"
            imageClassName="group-hover:scale-[1.03]"
            className="h-full"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {number && <span className="font-heading text-[0.7rem] text-foreground/70">{number}</span>}
              {lang === "fr" ? "Gamme" : "Range"}
            </span>
            <ArrowUpRight
              className="size-4 text-muted-foreground/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-2xl leading-snug sm:text-3xl">{category.name[lang]}</h3>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
            {category.intro[lang]}
          </p>
          <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-brand/40 bg-brand-soft/50 px-4 py-1.5 text-xs font-semibold text-brand-foreground/85 transition-colors group-hover:border-brand/70 group-hover:bg-brand-soft group-hover:text-foreground">
            {label}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_24px_52px_-24px_rgba(72,48,28,0.5)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <div className="overflow-hidden">
        <MediaFrame
          src={category.image}
          alt={category.caption[lang]}
          tone={category.tone}
          ratio="4/3"
          rounded="rounded-none"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          imageClassName="group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {number ? `${number} · ` : ""}
            {lang === "fr" ? "Gamme" : "Range"}
          </span>
          <ArrowUpRight
            className="size-4 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-xl leading-snug transition-colors group-hover:text-brand-foreground">
          {category.name[lang]}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {category.intro[lang]}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-brand-foreground/80 transition-colors group-hover:text-foreground">
          {label}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ProductCard({
  product,
  href,
  lang,
  label,
  eyebrow,
  className,
  photo = false,
}: {
  product: Product;
  href: string;
  lang: "fr" | "en";
  label: string;
  eyebrow?: string;
  className?: string;
  /** Show the served-on-the-table photo instead of the packshot, when one exists. */
  photo?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_24px_52px_-24px_rgba(72,48,28,0.5)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <div className="overflow-hidden">
        {photo && product.lifestyle ? (
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <Image
              src={product.lifestyle}
              alt={product.name[lang]}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        ) : (
          <MediaFrame
            src={product.image}
            alt={product.name[lang]}
            tone={product.tone}
            ratio="4/5"
            rounded="rounded-none"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            imageClassName="group-hover:scale-[1.05]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        {eyebrow && (
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h3 className="font-heading text-xl leading-snug transition-colors group-hover:text-brand-foreground">
          {product.name[lang]}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {product.description[lang]}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="text-sm font-medium text-brand-foreground/80 transition-colors group-hover:text-foreground">
            {label}
          </span>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary/60 transition-all group-hover:border-brand/60 group-hover:bg-brand-soft group-hover:text-brand-foreground">
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

const recipeTones: Record<Tone, string> = {
  cream: "linear-gradient(145deg, oklch(0.98 0.018 88), oklch(0.928 0.03 82))",
  wheat: "linear-gradient(145deg, oklch(0.96 0.04 90), oklch(0.872 0.062 80))",
  clay: "linear-gradient(145deg, oklch(0.912 0.042 66), oklch(0.80 0.066 52))",
  sage: "linear-gradient(145deg, oklch(0.945 0.028 125), oklch(0.85 0.04 135))",
  honey: "linear-gradient(145deg, oklch(0.955 0.056 88), oklch(0.852 0.086 74))",
  cocoa: "linear-gradient(145deg, oklch(0.82 0.048 56), oklch(0.672 0.052 46))",
  linen: "linear-gradient(145deg, oklch(0.975 0.012 90), oklch(0.92 0.02 86))",
};

export function RecipeCard({
  title,
  caption,
  tone,
  note,
  index = 0,
  href,
  summary,
  label,
  image,
  imageAlt,
  photo,
}: {
  title: string;
  caption: string;
  tone: Tone;
  note?: string;
  index?: number;
  href?: string;
  summary?: string;
  label?: string;
  /** Product shot shown in the corner of the illustration. */
  image?: string;
  imageAlt?: string;
  /** Photo of the finished dish; replaces the illustration when set. */
  photo?: string;
}) {
  const body = (
    <>
      {photo ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <Image
            src={photo}
            alt={caption}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <span
            aria-hidden="true"
            className="absolute left-5 top-4 rounded-full bg-background/85 px-3 py-1 font-heading text-sm text-foreground/70 backdrop-blur-sm"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      ) : (
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundImage: recipeTones[tone] }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(118deg, oklch(0.28 0.03 45) 0 1px, transparent 1px 9px)",
          }}
        />
        <FoodIllustration tone={tone} accent={toneStyles[tone].accent} />
        <span
          aria-hidden="true"
          className="absolute left-6 top-5 font-heading text-[3.5rem] leading-none text-foreground/20"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <ChefHat
          className="absolute right-6 top-6 size-5 text-foreground/35"
          aria-hidden="true"
        />
        {image && (
          <Image
            src={image}
            alt={imageAlt ?? ""}
            width={160}
            height={160}
            className="absolute bottom-3 right-4 size-24 object-contain drop-shadow-[0_14px_18px_rgba(72,48,28,0.35)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 sm:size-28"
          />
        )}
        <p
          className={cn(
            "absolute bottom-5 left-6 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-foreground/55",
            image ? "right-32" : "right-6",
          )}
        >
          {caption}
        </p>
      </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-xl leading-snug transition-colors group-hover:text-brand-foreground">
          {title}
        </h3>
        {summary && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        )}
        {(note || label) && (
          <div className="mt-auto flex items-center justify-between gap-3 pt-3">
            {note ? (
              <span className="flex items-center gap-1.5">
                <Clock className="size-3 text-muted-foreground/60" aria-hidden="true" />
                <span className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {note}
                </span>
              </span>
            ) : (
              <span />
            )}
            {label && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-foreground/80 transition-colors group-hover:text-foreground">
                {label}
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  const shell =
    "group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_22px_48px_-22px_rgba(72,48,28,0.45)]";

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          shell,
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
      >
        {body}
      </Link>
    );
  }

  return <article className={shell}>{body}</article>;
}

export function BusinessCard({
  index,
  title,
  body,
  href,
  className,
}: {
  index: string;
  title: string;
  body: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-border/70 bg-card p-7 transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand/60 hover:bg-brand-soft/30 hover:shadow-[0_22px_52px_-24px_rgba(72,48,28,0.5)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-1 w-0 bg-brand transition-all duration-300 group-hover:w-full"
      />

      <div className="flex flex-col gap-3.5">
        <span className="font-heading text-[2.5rem] font-medium leading-none text-brand/25 transition-colors group-hover:text-brand/40">
          {index}
        </span>
        <h3 className="text-2xl leading-snug">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>

      <span className="inline-flex items-center gap-2.5 text-sm font-medium">
        <span className="flex size-9 items-center justify-center rounded-full border border-border/80 p-2 transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
          {title}
        </span>
      </span>
    </Link>
  );
}
