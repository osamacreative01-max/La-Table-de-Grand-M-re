import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShoppingBag, Users } from "lucide-react";
import { CategoryMarquee } from "@/components/home/category-marquee";
import { HeroSlider, type HeroSlide } from "@/components/home/hero-slider";
import { Carousel } from "@/components/motion/carousel";
import { Reveal } from "@/components/motion/reveal";
import { CategoryCard, ProductCard, RecipeCard } from "@/components/site/cards";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/content/catalog";
import { banners, businessSubnav, home, recipesPage, ui } from "@/content/copy";
import { recipes } from "@/content/recipes";
import { recipeCardProps } from "@/lib/recipes";
import { categoryPath, paths, productPath } from "@/lib/routes";
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

const sliderLabels = {
  fr: {
    region: "À la une",
    previous: "Précédent",
    next: "Suivant",
    pause: "Mettre le diaporama en pause",
    play: "Relancer le diaporama",
    goTo: "Aller à la diapositive",
  },
  en: {
    region: "Featured",
    previous: "Previous",
    next: "Next",
    pause: "Pause the slideshow",
    play: "Play the slideshow",
    goTo: "Go to slide",
  },
} as const;

function heroSlides(lang: Lang): HeroSlide[] {
  const copy = home[lang];
  const banner = banners[lang];
  return [
    {
      image: "/images/hero-family-table.webp",
      alt: banner.heroAlt,
      eyebrow: copy.eyebrow,
      title: copy.hero.title,
      body: copy.hero.body,
      primary: { href: paths.products[lang], label: copy.hero.cta },
      secondary: { href: paths.story[lang], label: lang === "fr" ? "Notre histoire" : "Our Story" },
      theme: "dark",
      align: "left",
      focus: "70% center",
    },
    {
      image: "/images/banner-product-range.webp",
      alt: banner.rangeAlt,
      eyebrow: banner.rangeEyebrow,
      title: banner.rangeTitle,
      body: banner.rangeBody,
      primary: { href: paths.products[lang], label: banner.rangeCta },
      secondary: { href: paths.business[lang], label: ui[lang].business },
      theme: "dark",
      align: "left",
      focus: "80% center",
    },
    {
      image: "/images/hero-recipes.webp",
      alt: banner.recipesAlt,
      eyebrow: lang === "fr" ? "Idées repas" : "Meal ideas",
      title: recipesPage[lang].kicker,
      body: recipesPage[lang].intro,
      primary: { href: paths.recipes[lang], label: copy.recipes.cta },
      theme: "light",
      align: "right",
      focus: "18% center",
    },
  ];
}

export function HomeView({ lang }: { lang: Lang }) {
  const copy = home[lang];
  const t = ui[lang];
  const labels = sliderLabels[lang];
  const featured = featuredKeys
    .map((key) => products.find((product) => product.key === key))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const stats = [
    { value: categories.length, label: lang === "fr" ? "gammes" : "ranges" },
    { value: products.length, label: lang === "fr" ? "produits" : "products" },
    { value: recipes.length, label: lang === "fr" ? "recettes" : "recipes" },
  ];

  return (
    <main id="main">
      {/* ── A — HERO SLIDER ───────────────────────────────────────── */}
      <HeroSlider slides={heroSlides(lang)} labels={labels} />

      {/* ── A2 — RANGES TICKER ────────────────────────────────────── */}
      <CategoryMarquee lang={lang} />

      {/* ── B — PANTRY FAVOURITES ─────────────────────────────────── */}
      <Section tone="card">
        <Container size="wide">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={lang === "fr" ? "Le garde-manger" : "The pantry"}
              title={copy.collections.title}
              body={copy.collections.body}
              className="max-w-2xl"
            />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href={paths.products[lang]} />}
              className="shrink-0"
            >
              {copy.collections.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => {
              const category = categories.find((item) => item.key === product.category);
              if (!category) return null;
              return (
                <Reveal as="li" key={product.key} delay={index * 0.08}>
                  <ProductCard
                    product={product}
                    lang={lang}
                    href={productPath(lang, category.slug[lang], product.slug[lang])}
                    label={t.viewProduct}
                    eyebrow={category.name[lang]}
                    photo
                  />
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-12 grid grid-cols-3 divide-x divide-border/70 rounded-2xl border border-border/60 bg-background/60 py-6 text-center">
            {stats.map((stat) => (
              <p key={stat.label} className="px-3">
                <span className="block font-heading text-3xl text-foreground sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </span>
              </p>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ── B2 — RANGES CAROUSEL ──────────────────────────────────── */}
      <Section tone="paper" className="border-y border-border/60">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={lang === "fr" ? "Nos gammes" : "Our ranges"}
              title={lang === "fr" ? "Un garde-manger complet." : "A complete pantry."}
              body={
                lang === "fr"
                  ? "Huit gammes pour cuisiner au quotidien, des fruits du déjeuner aux nouilles du souper."
                  : "Eight ranges for everyday cooking, from breakfast fruit to dinnertime noodles."
              }
              className="max-w-2xl"
            />
          </Reveal>
          <Reveal className="mt-12">
            <Carousel
              label={lang === "fr" ? "Gammes de produits" : "Product ranges"}
              previousLabel={labels.previous}
              nextLabel={labels.next}
            >
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.key}
                  category={category}
                  href={categoryPath(lang, category.slug[lang])}
                  lang={lang}
                  label={t.seeProducts}
                  index={index}
                />
              ))}
            </Carousel>
          </Reveal>
        </Container>
      </Section>

      {/* ── C — BRAND STORY (logo nameplate colours) ─────────────── */}
      <Section className="theme-forest bg-background">

        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] border border-brand/20"
                style={{ transform: "rotate(-1.5deg)" }}
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_48px_96px_-50px_rgba(72,48,28,0.55)]">
                <Image
                  src="/images/hero-our-story.webp"
                  alt={banners[lang].storyAlt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  className="object-cover object-[80%_center]"
                />
              </div>
              <blockquote className="absolute -bottom-6 left-6 max-w-[15rem] rounded-2xl border border-brand/30 bg-card/95 px-5 py-4 shadow-xl backdrop-blur-sm">
                <p className="font-heading text-base leading-snug text-brand-foreground">
                  {lang === "fr" ? "« Viens t'asseoir, c'est prêt! »" : "“Come sit down, it's ready!”"}
                </p>
              </blockquote>
            </Reveal>

            <Reveal className="max-w-lg pt-4 lg:pt-0" delay={0.1}>
              <Eyebrow>{lang === "fr" ? "Notre histoire" : "Our Story"}</Eyebrow>
              <h2 className="mt-5 text-3xl leading-[1.08] sm:text-[2.6rem]">{copy.story.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
                {copy.story.body}
              </p>
              <p className="mt-6 border-l-4 border-brand pl-5 font-heading text-lg italic leading-snug text-foreground/85">
                {lang === "fr" ? "Le goût de se retrouver." : "The Taste of Coming Together."}
              </p>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={paths.story[lang]} />}
                className="mt-8"
              >
                {copy.story.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── D — RECIPES CAROUSEL ──────────────────────────────────── */}
      <Section tone="card" className="border-y border-border/60">
        <Container size="wide">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={lang === "fr" ? "Recettes" : "Recipes"}
              title={copy.recipes.title}
              body={copy.recipes.body}
              className="max-w-2xl"
            />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href={paths.recipes[lang]} />}
              className="shrink-0"
            >
              {copy.recipes.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </Reveal>
          <Reveal className="mt-12">
            <Carousel
              label={lang === "fr" ? "Recettes" : "Recipes"}
              previousLabel={labels.previous}
              nextLabel={labels.next}
            >
              {recipes.map((recipe, index) => (
                <RecipeCard key={recipe.key} {...recipeCardProps(recipe, lang, index)} />
              ))}
            </Carousel>
          </Reveal>
        </Container>
      </Section>

      {/* ── E — BUSINESS STRIP ────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink py-16 text-ink-foreground md:py-24">
        <Image
          src="/images/banner-product-range.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[85%_center] opacity-35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--ink)_20%,color-mix(in_oklab,var(--ink)_70%,transparent)_100%)]"
        />
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <Reveal>
              <Eyebrow tone="light">{lang === "fr" ? "Professionnels" : "Business"}</Eyebrow>
              <h2 className="mt-5 text-3xl leading-[1.08] text-ink-foreground sm:text-4xl lg:text-[2.7rem]">
                {copy.business.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-foreground/75 sm:text-[1.05rem]">
                {copy.business.body}
              </p>
              <Button
                size="xl"
                className="mt-8 border border-ink-foreground/20 bg-ink-foreground text-ink shadow-lg shadow-black/25 hover:bg-ink-foreground/92"
                nativeButton={false}
                render={<Link href={paths.business[lang]} />}
              >
                {copy.business.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Reveal>

            <ul className="flex flex-col gap-3">
              {businessSubnav[lang].map((child, index) => {
                const Icon = businessIcons[index];
                return (
                  <Reveal as="li" key={child.key} delay={index * 0.08}>
                    <Link
                      href={subHref[child.key][lang]}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-foreground/15 bg-ink/60 px-5 py-4 backdrop-blur-sm transition-all hover:border-ink-foreground/35 hover:bg-ink-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="flex items-center gap-3.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-ink-foreground/20 bg-ink-foreground/10">
                          <Icon className="size-4 text-ink-foreground/70" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-medium text-ink-foreground/85 group-hover:text-ink-foreground">
                          {child.label}
                        </span>
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 text-ink-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-ink-foreground/70"
                        aria-hidden="true"
                      />
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}
