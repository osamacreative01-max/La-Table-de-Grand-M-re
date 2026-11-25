import Link from "next/link";
import { Container, Section } from "@/components/site/primitives";
import { RecipeCard } from "@/components/site/cards";
import { MediaFrame } from "@/components/site/media-frame";
import { recipesPage } from "@/content/copy";
import { categories, products } from "@/content/catalog";
import { recipes } from "@/content/recipes";
import { recipeCardProps } from "@/lib/recipes";
import { productPath } from "@/lib/routes";
import type { Lang } from "@/content/types";

const pantryKeys = [
  "peches-en-morceaux",
  "pois-chiches",
  "sardines-sauce-tomate",
  "beurre-darachide-croquant",
  "palourdes-entieres-cuites",
  "salade-de-fruits",
];

export function RecipesView({ lang }: { lang: Lang }) {
  const copy = recipesPage[lang];
  const pantry = pantryKeys
    .map((key) => products.find((product) => product.key === key && product.image))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden bg-grain-rich">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.86 0.06 76 / 0.18), transparent 70%)" }}
        />
        <Container size="wide" className="relative py-16 md:py-24">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand-soft/60 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brand-foreground/75">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            {lang === "fr" ? "Idées repas" : "Meal ideas"}
          </div>
          <h1 className="mt-5 max-w-3xl text-[2.5rem] leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
            {copy.title}
          </h1>
          <p className="mt-6 font-heading text-[1.3rem] leading-snug text-brand-foreground/80 sm:text-2xl">
            {copy.kicker}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            {copy.intro}
          </p>
        </Container>
      </section>

      <Section className="pt-10 md:pt-14">
        <Container size="wide">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, index) => (
              <li key={recipe.key}>
                <RecipeCard {...recipeCardProps(recipe, lang, index)} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Pantry shelf */}
      <Section tone="card" className="border-t border-border/60">
        <Container size="wide">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-brand-foreground/70">
                {lang === "fr" ? "Le garde-manger" : "The pantry"}
              </p>
              <h2 className="mt-3 text-2xl leading-snug sm:text-3xl">
                {lang === "fr" ? "Les ingrédients de nos recettes" : "The ingredients behind our recipes"}
              </h2>
            </div>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-border/70 sm:block" />
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {pantry.map((product) => {
              const category = categories.find((item) => item.key === product.category);
              if (!category) return null;
              return (
                <li key={product.key}>
                  <Link
                    href={productPath(lang, category.slug[lang], product.slug[lang])}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_16px_36px_-20px_rgba(72,48,28,0.45)]"
                  >
                    <MediaFrame
                      src={product.image}
                      alt={product.name[lang]}
                      tone={product.tone}
                      ratio="1/1"
                      rounded="rounded-none"
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                      imageClassName="group-hover:scale-[1.05]"
                    />
                    <p className="p-3 text-xs font-medium leading-snug transition-colors group-hover:text-brand-foreground">
                      {product.name[lang]}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
