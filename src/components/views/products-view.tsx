import { Container, Section } from "@/components/site/primitives";
import { CategoryCard } from "@/components/site/cards";
import { JsonLd, breadcrumbSchema } from "@/components/site/json-ld";
import { categories, products } from "@/content/catalog";
import { productsPage, ui } from "@/content/copy";
import { categoryPath, paths } from "@/lib/routes";
import { cn } from "@/lib/utils";
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-grain-rich">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.86 0.065 80 / 0.2), transparent 70%)" }}
        />
        <Container size="wide" className="relative py-16 md:py-24">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand-soft/60 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brand-foreground/75">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            {lang === "fr" ? "Gammes" : "Ranges"}
          </div>
          <h1 className="mt-5 max-w-3xl text-[2.5rem] leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            {copy.intro}
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {[
              { n: String(categories.length), label: lang === "fr" ? "Gammes" : "Ranges" },
              { n: String(products.length), label: lang === "fr" ? "Produits" : "Products" },
              { n: "100%", label: lang === "fr" ? "Authenticité" : "Authentic" },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-baseline gap-2">
                <span className="font-heading text-[2.2rem] font-medium leading-none">{n}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section className="pt-6 md:pt-8">
        <Container size="wide">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <li
                key={category.key}
                className={cn(
                  index === categories.length - 1 &&
                    "sm:col-span-2 lg:col-span-3",
                )}
              >
                <CategoryCard
                  category={category}
                  lang={lang}
                  href={categoryPath(lang, category.slug[lang])}
                  label={t.seeProducts}
                  index={index}
                  wide={index === categories.length - 1}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
