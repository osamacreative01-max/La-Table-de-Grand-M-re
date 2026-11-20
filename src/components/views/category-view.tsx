import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section } from "@/components/site/primitives";
import { MediaFrame } from "@/components/site/media-frame";
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

      <section className="relative overflow-hidden bg-grain-rich">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <Container size="wide" className="relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand-soft/60 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brand-foreground/75">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
              {lang === "fr" ? "Gamme" : "Range"}
            </div>
            <h1 className="mt-5 max-w-3xl text-[2.2rem] leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              {category.name[lang]}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
              {category.intro[lang]}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-heading text-xl text-foreground">{items.length}</span>
              {lang === "fr" ? "produits dans cette gamme" : "products in this range"}
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] border border-brand/15"
              style={{ transform: "rotate(1.5deg)" }}
            />
            <MediaFrame
              src={category.image}
              alt={category.caption[lang]}
              tone={category.tone}
              ratio="4/3"
              rounded="rounded-[1.75rem]"
              priority
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="relative shadow-[0_40px_80px_-48px_rgba(72,48,28,0.55)]"
              
            />
          </div>
        </Container>
      </section>

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
