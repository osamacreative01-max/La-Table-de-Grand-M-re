import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles, UtensilsCrossed } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section, Eyebrow } from "@/components/site/primitives";
import { MediaFrame } from "@/components/site/media-frame";
import { ProductCard } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { JsonLd, breadcrumbSchema, productSchema } from "@/components/site/json-ld";
import { productPage, productsPage, ui } from "@/content/copy";
import { products, categories } from "@/content/catalog";
import { paths, productPath } from "@/lib/routes";
import { absolute } from "@/lib/metadata";
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

  const highlights =
    lang === "fr"
      ? ["Prêt à servir", "Garde-manger pratique", "Pour toute la famille"]
      : ["Ready to serve", "Pantry convenient", "For the whole family"];

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
          image: product.image ? absolute(product.image) : undefined,
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
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] border border-brand/15"
                style={{ transform: "rotate(1.5deg)" }}
              />
              <MediaFrame
                src={product.image}
                alt={product.name[lang]}
                tone={product.tone}
                ratio="4/5"
                rounded="rounded-[1.75rem]"
                priority
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="relative shadow-[0_48px_96px_-50px_rgba(72,48,28,0.55)]"
                imageClassName="p-[5%]"
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

              <ul className="mt-7 flex flex-wrap gap-2">
                {highlights.map((item, index) => {
                  const Icon = index === 1 ? Sparkles : index === 2 ? UtensilsCrossed : Check;
                  return (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/40 px-3.5 py-1.5 text-xs font-medium text-foreground/75"
                    >
                      <Icon className="size-3.5 text-brand-foreground/70" aria-hidden="true" />
                      {item}
                    </li>
                  );
                })}
              </ul>

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
                      render={<Link href={paths.business[lang]} />}
                      className="shadow-sm shadow-primary/15"
                    >
                      {copy.businessCta}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
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
