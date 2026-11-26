import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/cards";
import { JsonLd, breadcrumbSchema } from "@/components/site/json-ld";
import { productsPage, ui } from "@/content/copy";
import { paths } from "@/lib/routes";
import { productPath } from "@/lib/routes";
import { absolute } from "@/lib/metadata";
import type { Category, Product, Lang } from "@/content/types";

export function CategoryView({
  lang,
  category,
  items,
}: {
  lang: Lang;
  category: Category;
  items: Product[];
}) {
  const t = ui[lang];
  const copy = productsPage[lang];

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, url: absolute(paths.home[lang]) },
          { name: copy.title, url: absolute(paths.products[lang]) },
          {
            name: category.name[lang],
            url: absolute(`${paths.products[lang]}/${category.slug[lang]}`),
          },
        ])}
      />

      <Breadcrumbs
        label={t.breadcrumb}
        items={[
          { label: t.home, href: paths.home[lang] },
          { label: copy.title, href: paths.products[lang] },
          { label: category.name[lang] },
        ]}
      />

      <PageHero
        eyebrow={lang === "fr" ? "Gamme" : "Range"}
        title={category.name[lang]}
        image={{ kind: "product", src: category.image, alt: category.caption[lang], tone: category.tone }}
      >
        <p>{category.intro[lang]}</p>
        <p className="mt-6 inline-flex items-baseline gap-2">
          <span className="font-heading text-[2.4rem] leading-none text-gold-light">{items.length}</span>
          <span className="text-sm uppercase tracking-[0.14em]">
            {lang === "fr" ? "Produits dans cette gamme" : "Products in This Range"}
          </span>
        </p>
      </PageHero>

      <Section className="pt-8 md:pt-12">
        <Container size="wide">
          <h2 className="sr-only">{t.productsInCategory}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <li key={product.key}>
                <ProductCard
                  product={product}
                  lang={lang}
                  href={productPath(lang, category.slug[lang], product.slug[lang])}
                  label={t.viewProduct}
                />
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link
              href={paths.products[lang]}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t.backToProducts}
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
