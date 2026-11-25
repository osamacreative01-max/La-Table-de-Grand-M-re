import Link from "next/link";
import { ArrowLeft, ArrowRight, ChefHat, Clock, Flame, Lightbulb, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { RecipeCard } from "@/components/site/cards";
import { JsonLd, breadcrumbSchema, recipeSchema } from "@/components/site/json-ld";
import { MediaFrame } from "@/components/site/media-frame";
import { Container, Eyebrow, Section } from "@/components/site/primitives";
import { recipePage, recipesPage, ui } from "@/content/copy";
import { recipes } from "@/content/recipes";
import { absolute } from "@/lib/metadata";
import { recipeCardProps, recipeProducts } from "@/lib/recipes";
import { paths, recipePath } from "@/lib/routes";
import type { Lang, Recipe } from "@/content/types";

export function RecipeView({ lang, recipe }: { lang: Lang; recipe: Recipe }) {
  const t = ui[lang];
  const copy = recipePage[lang];
  const url = recipePath(lang, recipe.slug[lang]);
  const pantry = recipeProducts(recipe, lang);
  const main = pantry[0]?.product;
  const more = recipes.filter((item) => item.key !== recipe.key).slice(0, 3);

  const facts = [
    { icon: Clock, label: copy.prep, value: `${recipe.prepMinutes} ${copy.minutes}` },
    {
      icon: Flame,
      label: copy.cook,
      value: recipe.cookMinutes > 0 ? `${recipe.cookMinutes} ${copy.minutes}` : copy.none,
    },
    { icon: Users, label: copy.servings, value: String(recipe.servings) },
  ];

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, url: absolute(paths.home[lang]) },
          { name: recipesPage[lang].title, url: absolute(paths.recipes[lang]) },
          { name: recipe.title[lang], url: absolute(url) },
        ])}
      />
      <JsonLd
        data={recipeSchema({
          lang,
          name: recipe.title[lang],
          description: recipe.summary[lang],
          url: absolute(url),
          image: main?.image ? absolute(main.image) : undefined,
          prepMinutes: recipe.prepMinutes,
          cookMinutes: recipe.cookMinutes,
          servings: recipe.servings,
          ingredients: recipe.ingredients[lang],
          steps: recipe.steps[lang],
        })}
      />

      <Breadcrumbs
        label={t.breadcrumb}
        items={[
          { label: t.home, href: paths.home[lang] },
          { label: recipesPage[lang].title, href: paths.recipes[lang] },
          { label: recipe.title[lang] },
        ]}
      />

      {/* Hero */}
      <Section className="pt-10 md:pt-16">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow>
                <ChefHat className="size-3.5" aria-hidden="true" />
                {lang === "fr" ? "Recette" : "Recipe"}
              </Eyebrow>
              <h1 className="mt-5 text-[2.3rem] leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                {recipe.title[lang]}
              </h1>
              <p className="mt-6 max-w-xl font-heading text-xl leading-snug text-brand-foreground/80">
                {recipe.summary[lang]}
              </p>

              <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border/70 bg-card px-4 py-3.5"
                  >
                    <dt className="flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      <Icon className="size-3 text-brand-foreground/70" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-1 font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] border border-brand/15"
                style={{ transform: "rotate(-1.5deg)" }}
              />
              <MediaFrame
                src={recipe.photo ?? main?.image}
                alt={recipe.photo || !main ? recipe.caption[lang] : main.name[lang]}
                imageClassName={recipe.photo ? "object-cover p-0 drop-shadow-none" : undefined}
                caption={recipe.caption[lang]}
                tone={recipe.tone}
                ratio="4/3"
                rounded="rounded-[1.75rem]"
                priority
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="relative shadow-[0_48px_96px_-50px_rgba(72,48,28,0.55)]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Ingredients + method */}
      <Section tone="card" className="border-y border-border/60">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-2xl leading-snug sm:text-3xl">{copy.ingredients}</h2>
              <ul className="mt-6 flex flex-col divide-y divide-border/60 rounded-2xl border border-border/70 bg-background">
                {recipe.ingredients[lang].map((item) => (
                  <li key={item} className="flex gap-3 px-5 py-3.5 text-sm leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl leading-snug sm:text-3xl">{copy.steps}</h2>
              <ol className="mt-6 flex flex-col gap-5">
                {recipe.steps[lang].map((step, index) => (
                  <li key={step} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand-soft/60 font-heading text-lg text-brand-foreground"
                    >
                      {index + 1}
                    </span>
                    <p className="pt-2 text-[0.98rem] leading-relaxed text-foreground/90">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              {recipe.tip && (
                <aside className="mt-10 flex items-start gap-3.5 rounded-2xl border border-brand/25 bg-brand-soft/40 px-5 py-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-card">
                    <Lightbulb className="size-4 text-brand-foreground/75" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-brand-foreground/70">
                      {copy.tip}
                    </p>
                    <p className="mt-1 font-heading text-lg leading-snug text-foreground">
                      {recipe.tip[lang]}
                    </p>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Products used */}
      {pantry.length > 0 && (
        <Section>
          <Container size="wide">
            <Eyebrow>{copy.productsTitle}</Eyebrow>
            <h2 className="mt-4 text-3xl leading-[1.08] sm:text-[2.2rem]">{copy.productsKicker}</h2>
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {pantry.map(({ product, href }) => (
                <li key={product.key}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_16px_36px_-20px_rgba(72,48,28,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <MediaFrame
                      src={product.image}
                      alt={product.name[lang]}
                      tone={product.tone}
                      ratio="1/1"
                      rounded="rounded-none"
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                      imageClassName="group-hover:scale-[1.05]"
                    />
                    <p className="flex items-center justify-between gap-2 p-4 text-sm font-medium leading-snug transition-colors group-hover:text-brand-foreground">
                      {product.name[lang]}
                      <ArrowRight
                        className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* More recipes */}
      <Section tone="card" className="border-t border-border/60">
        <Container size="wide">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl leading-[1.08] sm:text-[2.2rem]">{copy.moreTitle}</h2>
            <Link
              href={paths.recipes[lang]}
              className="group inline-flex items-center gap-2 rounded-sm text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              <ArrowLeft
                className="size-4 transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              {copy.backToRecipes}
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((item) => (
              <li key={item.key}>
                <RecipeCard {...recipeCardProps(item, lang, recipes.indexOf(item))} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
