import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShoppingBag, Users } from "lucide-react";
import { HeroSlider, type HeroSlide } from "@/components/home/hero-slider";
import { MediaFrame } from "@/components/site/media-frame";
import { ProductCard, RecipeCard } from "@/components/site/cards";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/content/catalog";
import { banners, businessSubnav, home, recipesPage, ui } from "@/content/copy";
import { recipes } from "@/content/recipes";
import { recipeCardProps } from "@/lib/recipes";
import { cn } from "@/lib/utils";
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
      theme: "dark",
      align: "left",
      focus: "80% center",
    },
    {
      image: "/images/hero-recipes.webp",
      alt: banner.recipesAlt,
      eyebrow: lang === "fr" ? "Idées repas" : "Meal Ideas",
      title: recipesPage[lang].kicker,
      body: recipesPage[lang].intro,
      primary: { href: paths.recipes[lang], label: copy.recipes.cta },
      theme: "light",
      align: "right",
      focus: "18% center",
    },
  ];
}

/** Every section after the hero fills exactly one screen on a desktop. */
const screen = "flex min-h-svh flex-col justify-center";

export function HomeView({ lang }: { lang: Lang }) {
  const copy = home[lang];
  const t = ui[lang];
  const labels = sliderLabels[lang];
  const featured = featuredKeys
    .map((key) => products.find((product) => product.key === key))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <main id="main">
      {/* ── A — HERO SLIDER ───────────────────────────────────────── */}
      <HeroSlider slides={heroSlides(lang)} labels={labels} />

      {/* ── B — PANTRY FAVOURITES ─────────────────────────────────── */}
      <Section tone="card" className={screen}>
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={lang === "fr" ? "Le garde-manger" : "The Pantry"}
              title={copy.collections.title}
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
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </Container>
      </Section>

      {/* ── C — THE EIGHT RANGES ──────────────────────────────────── */}
      <Section tone="paper" className={cn(screen, "border-y border-border/60")}>
        <Container size="wide">
          <SectionHeading
            eyebrow={lang === "fr" ? "Nos gammes" : "Our Ranges"}
            title={lang === "fr" ? "Huit gammes pour le garde-manger." : "Eight Ranges for the Pantry."}
            className="max-w-2xl"
          />
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {categories.map((category) => (
              <li key={category.key}>
                <Link
                  href={categoryPath(lang, category.slug[lang])}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_18px_40px_-24px_rgba(46,31,21,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <MediaFrame
                    src={category.image}
                    alt={category.caption[lang]}
                    tone={category.tone}
                    ratio="16/9"
                    rounded="rounded-none"
                    sizes="(min-width: 1024px) 23vw, 46vw"
                    imageClassName="group-hover:scale-[1.03]"
                  />
                  <span className="flex flex-1 items-center justify-between gap-3 px-4 py-3.5">
                    <span className="font-heading text-[1.05rem] leading-snug transition-colors group-hover:text-brand-foreground">
                      {category.name[lang]}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── D — BRAND STORY (logo nameplate colours) ─────────────── */}
      <Section className={cn(screen, "theme-forest bg-background")}>
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-6">
            <div className="lg:pr-16">
              <Eyebrow>{lang === "fr" ? "Notre histoire" : "Our Story"}</Eyebrow>
              <h2 className="mt-5 text-3xl leading-[1.08] sm:text-[2.6rem]">{copy.story.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
                {copy.story.body}
              </p>
              <blockquote className="mt-7 border-t border-border pt-6 font-heading text-2xl italic leading-snug text-foreground">
                {lang === "fr" ? "« Viens t'asseoir, c'est prêt! »" : "“Come sit down, it's ready!”"}
              </blockquote>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={paths.story[lang]} />}
                className="mt-8"
              >
                {copy.story.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/hero-our-story.webp"
                alt={banners[lang].storyAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover object-[80%_center]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── E — RECIPES ───────────────────────────────────────────── */}
      <Section tone="card" className={screen}>
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
              nativeButton={false}
              render={<Link href={paths.recipes[lang]} />}
              className="shrink-0"
            >
              {copy.recipes.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>li:nth-child(3)]:hidden lg:[&>li:nth-child(3)]:block">
            {recipes.slice(0, 3).map((recipe, index) => (
              <li key={recipe.key}>
                <RecipeCard {...recipeCardProps(recipe, lang, index)} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── F — BUSINESS ──────────────────────────────────────────── */}
      <Section className={cn(screen, "theme-forest relative isolate overflow-hidden bg-background")}>
        <Image
          src="/images/banner-product-range.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="z-0 object-cover object-[85%_center] opacity-15"
        />
        <Container size="wide" className="relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-6">
            <div className="lg:pr-16">
              <Eyebrow>{lang === "fr" ? "Professionnels" : "Business"}</Eyebrow>
              <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
                {copy.business.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
                {copy.business.body}
              </p>
              <Button
                size="lg"
                className="mt-8"
                nativeButton={false}
                render={<Link href={paths.business[lang]} />}
              >
                {copy.business.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <ul className="flex flex-col border-t border-border">
              {businessSubnav[lang].map((child, index) => {
                const Icon = businessIcons[index];
                return (
                  <li key={child.key} className="border-b border-border">
                    <Link
                      href={subHref[child.key][lang]}
                      className="group flex items-center justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="flex items-center gap-3.5">
                        <Icon className="size-5 text-primary" aria-hidden="true" />
                        <span className="text-base font-medium text-foreground underline-offset-4 group-hover:underline">
                          {child.label}
                        </span>
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
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
