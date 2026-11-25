import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Leaf, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/site/primitives";
import { ProductCard, RecipeCard } from "@/components/site/cards";
import { banners, businessSubnav, home, ui } from "@/content/copy";
import { categories, products } from "@/content/catalog";
import { recipes } from "@/content/recipes";
import { recipeCardProps } from "@/lib/recipes";
import { paths, productPath } from "@/lib/routes";
import type { Lang } from "@/content/types";

const subHref: Record<string, Record<Lang, string>> = {
  retailers: paths.retailers,
  wholesale: paths.wholesale,
  foodservice: paths.foodservice,
};

const businessIcons = [ShoppingBag, Users, Leaf];

const featuredKeys = [
  "lentilles-rouges-fendues",
  "poulet",
  "nouilles-poulet-epice",
  "beurre-darachide-croquant",
];

export function HomeView({ lang }: { lang: Lang }) {
  const copy = home[lang];
  const t = ui[lang];
  const featured = featuredKeys
    .map((key) => products.find((product) => product.key === key))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));
  const recipeCards = recipes.slice(0, 3);

  return (
    <main id="main">
      {/* ── A — HERO ──────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <Image
          src="/images/hero-family-table.webp"
          alt={banners[lang].heroAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[72%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-ink/70 lg:bg-transparent lg:bg-[linear-gradient(90deg,var(--ink)_0%,color-mix(in_oklab,var(--ink)_85%,transparent)_38%,transparent_70%)]"
        />

        <Container
          size="wide"
          className="flex min-h-[560px] items-center py-20 md:min-h-[620px] lg:min-h-[680px] lg:py-28"
        >
          <div className="max-w-[34rem] animate-fade-up">
            <Eyebrow tone="light">{copy.eyebrow}</Eyebrow>

            <h1 className="mt-6 text-[2.375rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ink-foreground sm:text-[3rem] lg:text-[3.5rem]">
              {copy.hero.title}
            </h1>

            <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink-foreground/85 sm:text-[1.125rem]">
              {copy.hero.body}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button size="xl" nativeButton={false} render={<Link href={paths.products[lang]} />}>
                {copy.hero.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                nativeButton={false}
                render={<Link href={paths.story[lang]} />}
                className="border-cream/50 text-cream hover:border-cream hover:bg-cream hover:text-ink"
              >
                {lang === "fr" ? "Notre histoire" : "Our Story"}
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2.5">
              {(lang === "fr"
                ? ["Produits de qualité", "Recettes inspirantes", "Fait pour la famille"]
                : ["Quality products", "Inspiring recipes", "Made for families"]
              ).map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3.5 py-1.5 text-[0.75rem] font-medium text-ink-foreground/90 backdrop-blur-sm"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-4 items-center justify-center rounded-full bg-cream text-ink"
                  >
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── A2 — RANGE BANNER ─────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <Image
          src="/images/banner-product-range.webp"
          alt={banners[lang].rangeAlt}
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[85%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-ink/75 md:bg-transparent md:bg-[linear-gradient(90deg,var(--ink)_0%,color-mix(in_oklab,var(--ink)_70%,transparent)_35%,transparent_60%)]"
        />
        <Container size="wide" className="flex min-h-[340px] items-center py-14 md:min-h-[400px]">
          <div className="max-w-md">
            <Eyebrow tone="light">{banners[lang].rangeEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl leading-[1.08] text-ink-foreground sm:text-[2.4rem]">
              {banners[lang].rangeTitle}
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-foreground/80">
              {banners[lang].rangeBody}
            </p>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={paths.products[lang]} />}
              className="mt-7"
            >
              {banners[lang].rangeCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* ── B — PANTRY FAVOURITES ─────────────────────────────────── */}
      <Section tone="card" className="border-y border-border/60">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={lang === "fr" ? "Le garde-manger" : "The pantry"}
              title={copy.collections.title}
              body={copy.collections.body}
              className="max-w-2xl"
            />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false} render={<Link href={paths.products[lang]} />}
              className="shrink-0"
            >
              {copy.collections.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => {
              const category = categories.find((item) => item.key === product.category);
              if (!category) return null;
              return (
                <li key={product.key}>
                  <ProductCard
                    product={product}
                    lang={lang}
                    href={productPath(lang, category.slug[lang], product.slug[lang])}
                    label={t.viewProduct}
                    eyebrow={category.name[lang]}
                    photo
                  />
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border/50 bg-secondary/30 px-6 py-4 text-sm text-muted-foreground">
            <p>
              <span className="font-heading text-xl font-medium text-foreground">{categories.length}</span>{" "}
              {lang === "fr" ? "gammes de produits" : "product ranges"}
            </p>
            <span aria-hidden="true" className="hidden h-5 w-px bg-border/70 sm:block" />
            <p>
              <span className="font-heading text-xl font-medium text-foreground">{products.length}</span>{" "}
              {lang === "fr" ? "produits" : "products"}
            </p>
            <span aria-hidden="true" className="hidden h-5 w-px bg-border/70 sm:block" />
            <p>{lang === "fr" ? "Pour toute la famille" : "For the whole family"}</p>
          </div>
        </Container>
      </Section>

      {/* ── C — BRAND STORY ───────────────────────────────────────── */}
      <Section>
        <Container size="wide">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-grain-rich">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-lines opacity-50"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.86 0.06 76 / 0.2), transparent 70%)",
              }}
            />

            <div className="relative grid items-center gap-10 px-7 py-10 md:px-12 md:py-14 lg:grid-cols-2 lg:gap-16">
              <div className="relative order-last lg:order-first">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-dots opacity-40"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-[9%] h-[80%] w-[56%] -translate-x-1/2 rounded-t-[999px] border border-brand/25 bg-brand-soft/40"
                  />
                  <Image
                    src="/products/cherries.webp"
                    alt={
                      lang === "fr"
                        ? "Cerises La Table de Grand-Mère"
                        : "La Table de Grand-Mère cherries"
                    }
                    width={691}
                    height={1000}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="absolute left-1/2 top-1/2 h-[112%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_28px_rgba(72,48,28,0.16)]"
                  />
                </div>
                <blockquote className="absolute -bottom-5 right-4 hidden max-w-[13rem] rounded-2xl border border-brand/30 bg-card/95 px-4 py-3 shadow-xl backdrop-blur-sm sm:block">
                  <p className="font-heading text-sm leading-snug text-brand-foreground">
                    {lang === "fr" ? "« Viens t'asseoir, c'est prêt! »" : '"Come sit down, it\'s ready!"'}
                  </p>
                </blockquote>
              </div>

              <div className="max-w-lg">
                <Eyebrow tone="muted">
                  {lang === "fr" ? "Notre histoire" : "Our Story"}
                </Eyebrow>
                <h2 className="mt-5 text-3xl leading-[1.08] sm:text-[2.6rem]">
                  {copy.story.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
                  {copy.story.body}
                </p>

                <div className="mt-5 rounded-xl border-l-4 border-brand bg-brand-soft/40 py-3 pl-5 pr-4">
                  <p className="font-heading text-base leading-snug text-foreground/85">
                    {lang === "fr"
                      ? "Le goût de se retrouver."
                      : "The Taste of Coming Together."}
                  </p>
                </div>

                <Link
                  href={paths.story[lang]}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-brand/60 hover:bg-brand-soft/50"
                >
                  {copy.story.cta}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── D — RECIPES ───────────────────────────────────────────── */}
      <Section tone="paper" className="border-y border-border/60">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={lang === "fr" ? "Recettes" : "Recipes"}
              title={copy.recipes.title}
              body={copy.recipes.body}
              className="max-w-2xl"
            />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false} render={<Link href={paths.recipes[lang]} />}
              className="shrink-0"
            >
              {copy.recipes.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recipeCards.map((recipe, index) => (
              <li key={recipe.key}>
                <RecipeCard {...recipeCardProps(recipe, lang, index)} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── E — BUSINESS STRIP ────────────────────────────────────── */}
      <Section tone="ink">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <Eyebrow tone="light">
                {lang === "fr" ? "Professionnels" : "Business"}
              </Eyebrow>
              <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
                {copy.business.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-foreground/70 sm:text-[1.05rem]">
                {copy.business.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="xl"
                  className="border border-ink-foreground/20 bg-ink-foreground text-ink shadow-lg shadow-black/25 hover:bg-ink-foreground/92"
                  nativeButton={false} render={<Link href={paths.business[lang]} />}
                >
                  {copy.business.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {businessSubnav[lang].map((child, i) => {
                const Icon = businessIcons[i];
                return (
                  <li key={child.key}>
                    <Link
                      href={subHref[child.key][lang]}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 px-5 py-4 transition-all hover:border-ink-foreground/35 hover:bg-ink-foreground/10"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-ink-foreground/20 bg-ink-foreground/10">
                          <Icon className="size-4 text-ink-foreground/70" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-medium text-ink-foreground/85 group-hover:text-ink-foreground">
                          {child.label}
                        </span>
                      </div>
                      <ArrowRight
                        className="size-4 shrink-0 text-ink-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-ink-foreground/70"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </Section>
    </main>
  );
}
