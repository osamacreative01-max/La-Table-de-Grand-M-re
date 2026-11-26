import { Container, Section } from "@/components/site/primitives";
import { PageHero } from "@/components/site/page-hero";
import { CategoryCard } from "@/components/site/cards";
import { JsonLd, breadcrumbSchema } from "@/components/site/json-ld";
import { categories, products } from "@/content/catalog";
import { productsPage, ui } from "@/content/copy";
import { categoryPath, paths } from "@/lib/routes";
import { absolute } from "@/lib/metadata";
import type { Lang } from "@/content/types";

export function ProductsView({ lang }: { lang: Lang }) {
  const copy = productsPage[lang];
  const t = ui[lang];

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, url: absolute(paths.home[lang]) },
          { name: copy.title, url: absolute(paths.products[lang]) },
        ])}
      />

      <PageHero
        eyebrow={lang === "fr" ? "Gammes" : "Ranges"}
        title={copy.title}
        image={{
          kind: "photo",
          src: "/images/banner-product-range.webp",
          alt: lang === "fr" ? "La gamme La Table de Grand-Mère" : "The La Table de Grand-Mère range",
          position: "82% center",
        }}
      >
        <p>{copy.intro}</p>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {[
            { n: String(categories.length), label: lang === "fr" ? "Gammes" : "Ranges" },
            { n: String(products.length), label: lang === "fr" ? "Produits" : "Products" },
          ].map(({ n, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <dd className="font-heading text-[2.4rem] leading-none text-gold-light">{n}</dd>
              <dt className="text-sm uppercase tracking-[0.14em]">{label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section className="pt-6 md:pt-8">
        <Container size="wide">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <li key={category.key}>
                <CategoryCard
                  category={category}
                  lang={lang}
                  href={categoryPath(lang, category.slug[lang])}
                  label={t.seeProducts}
                  index={index}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
