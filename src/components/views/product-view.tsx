import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Snowflake, UtensilsCrossed } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section, Eyebrow } from "@/components/site/primitives";
import { MediaFrame } from "@/components/site/media-frame";
import { ProductCard, RecipeCard } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { JsonLd, breadcrumbSchema, productSchema } from "@/components/site/json-ld";
import { productPage, productsPage, recipePage, ui } from "@/content/copy";
import { products, categories } from "@/content/catalog";
import { recipes, recipesForProduct } from "@/content/recipes";
import { paths, productPath } from "@/lib/routes";
import { absolute } from "@/lib/metadata";
import { recipeCardProps } from "@/lib/recipes";
import type { Category, Product, Lang } from "@/content/types";

export function ProductView({
  lang,
  category,
  product,
}: {
  lang: Lang;
  category: Category;
  product: Product;
}) {
  const t = ui[lang];
  const copy = productPage[lang];
  const url = `${paths.products[lang]}/${category.slug[lang]}/${product.slug[lang]}`;

  const related = [
    ...products.filter(
      (item) => item.category === category.key && item.key !== product.key && item.image,
    ),
    ...products.filter(
      (item) => item.category !== category.key && item.image && item.key !== product.key,
    ),
  ].slice(0, 3);

  const usedIn = recipesForProduct(product.key);

  // Products without a packshot yet (rice, pasta) lead with their food photo instead.
  const photoOnly = !product.image && Boolean(product.lifestyle);
  const heroImage = product.image ?? product.lifestyle;

  const detailFields: { label: string; value: string }[] = [];
  if (product.format) {
    detailFields.push({ label: copy.formatLabel, value: product.format[lang] });
  }
  if (product.netWeight) {
    detailFields.push({ label: copy.weightLabel, value: product.netWeight });
  }

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, url: absolute(paths.home[lang]) },
          { name: productsPage[lang].title, url: absolute(paths.products[lang]) },
          { name: category.name[lang], url: absolute(`${paths.products[lang]}/${category.slug[lang]}`) },
          { name: product.name[lang], url: absolute(url) },
        ])}
      />
      <JsonLd
        data={productSchema({
          lang,
          name: product.name[lang],
          description: product.description[lang],
          category: category.name[lang],
          url: absolute(url),
          image: heroImage ? absolute(heroImage) : undefined,
        })}
      />

      <Breadcrumbs
        label={t.breadcrumb}
        items={[
          { label: t.home, href: paths.home[lang] },
          { label: productsPage[lang].title, href: paths.products[lang] },
          { label: category.name[lang], href: `${paths.products[lang]}/${category.slug[lang]}` },
          { label: product.name[lang] },
        ]}
      />

      <Section className="pt-10 md:pt-16">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="relative">
              <MediaFrame
                src={heroImage}
                alt={product.name[lang]}
                tone={product.tone}
                imageClassName={photoOnly ? "object-cover p-0 drop-shadow-none" : undefined}
                ratio="4/5"
                rounded="rounded-[1.75rem]"
                priority
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="relative shadow-[0_48px_96px_-50px_rgba(72,48,28,0.55)]"
              />
            </div>

            <div className="flex flex-col justify-center">
              <Eyebrow>{category.name[lang]}</Eyebrow>
              <h1 className="mt-5 text-[2.3rem] leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                {product.name[lang]}
              </h1>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
                {product.description[lang]}
              </p>

              {detailFields.length > 0 && (
                <dl className="mt-8 flex flex-wrap gap-3">
                  {detailFields.map((field) => (
                    <div
                      key={field.label}
                      className="min-w-[9.5rem] rounded-xl border border-border/70 bg-card px-5 py-3.5"
                    >
                      <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {field.label}
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {product.storage && (
                <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Snowflake className="size-3.5 text-brand-foreground/70" aria-hidden="true" />
                  {product.storage[lang]}
                </p>
              )}

              {product.lifestyle && !photoOnly && (
                <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-border/70">
                  <Image
                    src={product.lifestyle}
                    alt={product.serving ? product.serving[lang] : product.name[lang]}
                    fill
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    className="object-cover object-[center_60%]"
                  />
                </div>
              )}

              {product.serving && (
                <div className="mt-4 flex items-start gap-3.5 rounded-2xl border border-brand/25 bg-brand-soft/40 px-5 py-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-card">
                    <UtensilsCrossed className="size-4 text-brand-foreground/75" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-brand-foreground/70">
                      {copy.servingLabel}
                    </p>
                    <p className="mt-1 font-heading text-lg leading-snug text-foreground">
                      {product.serving[lang]}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-10 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                <div className="border-b border-border/60 px-6 py-5">
                  <h2 className="text-xl leading-snug">{copy.businessTitle}</h2>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {copy.businessBody}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      nativeButton={false} render={<Link href={paths.business[lang]} />}
                      className="shadow-sm shadow-primary/15"
                    >
                      {copy.businessCta}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      nativeButton={false}
                      render={
                        <Link href={`${paths.products[lang]}/${category.slug[lang]}`} />
                      }
                    >
                      {t.backToCategory}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {usedIn.length > 0 && (
        <Section className="pt-0 md:pt-0">
          <Container size="wide">
            <Eyebrow>{recipePage[lang].withProduct}</Eyebrow>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {usedIn.map((recipe) => (
                <li key={recipe.key}>
                  <RecipeCard {...recipeCardProps(recipe, lang, recipes.indexOf(recipe))} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="card" className="border-y border-border/60">
          <Container size="wide">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>{copy.relatedTitle}</Eyebrow>
                <h2 className="mt-4 text-3xl leading-[1.08] sm:text-[2.2rem]">
                  {lang === "fr" ? "À découvrir aussi." : "You may also like."}
                </h2>
              </div>
              <Link
                href={paths.products[lang]}
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                {t.backToProducts}
              </Link>
            </div>

            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const itemCategory = categories.find(
                  (entry) => entry.key === item.category,
                );
                if (!itemCategory) return null;
                return (
                  <li key={item.key}>
                    <ProductCard
                      product={item}
                      lang={lang}
                      href={productPath(lang, itemCategory.slug[lang], item.slug[lang])}
                      label={t.viewProduct}
                      eyebrow={itemCategory.name[lang]}
                    />
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>
      )}
    </main>
  );
}
