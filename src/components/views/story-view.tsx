import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MediaFrame } from "@/components/site/media-frame";
import { Container, Eyebrow, Section } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/content/catalog";
import { banners, storyPage } from "@/content/copy";
import { paths, productPath } from "@/lib/routes";
import type { Lang } from "@/content/types";

/** Products whose label carries her portrait, shown in the last section. */
const labelKeys = [
  "peches-en-moities",
  "sardines-sauce-tomate",
  "beurre-darachide-croquant",
  "poulet",
  "haricots-rouges",
];

/** Every section after the banner fills one screen on a desktop. */
const screen = "flex min-h-svh flex-col justify-center";

export function StoryView({ lang }: { lang: Lang }) {
  const copy = storyPage[lang];
  const [lead, kitchen, , spirit, belief, remembered] = copy.paragraphs;
  // The paragraph ends on her words; they are set large just below it, so stop at the colon/comma.
  const kitchenLead = kitchen.split(/[«“]/)[0].trim();
  const labelled = labelKeys.flatMap((key) => {
    const product = products.find((item) => item.key === key);
    const category = product && categories.find((item) => item.key === product.category);
    return product && category ? [{ product, category }] : [];
  });

  return (
    <main id="main">
      {/* Banner */}
      <section className="relative isolate overflow-hidden bg-background">
        <Image
          src="/images/hero-our-story.webp"
          alt={banners[lang].storyAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[75%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-background/80 lg:bg-transparent lg:bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_80%,transparent)_30%,transparent_55%)]"
        />

        <Container size="wide" className="flex min-h-[460px] items-center py-16 md:min-h-[540px] md:py-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand-soft/60 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brand-foreground/75">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
              {lang === "fr" ? "Depuis la cuisine" : "From the Kitchen"}
            </div>
            <h1 className="mt-6 text-[2.6rem] leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 font-heading text-[1.3rem] leading-snug text-brand-foreground/80 sm:text-2xl">
              {copy.kicker}
            </p>
          </div>
        </Container>
      </section>

      {/* ── 1 — GRAND-MAMAN: her portrait and her voice ─────────────── */}
      <Section className={`${screen} theme-forest bg-background`}>
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
            {/* An arch, like the round wooden frame of the logo */}
            <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <div className="rounded-t-[999px] border border-gold/50 p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-forest-deep">
                  <Image
                    src="/images/story-grandma-portrait.webp"
                    alt={copy.portraitAlt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>{copy.grandma}</Eyebrow>
              <h2 className="mt-5 text-[2.1rem] leading-[1.08] sm:text-5xl">{lead}</h2>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lg">
                {kitchenLead}
              </p>
              <blockquote className="mt-8">
                <p className="font-heading text-[2rem] italic leading-tight text-gold-light sm:text-[2.75rem]">
                  {copy.voice}
                </p>
                <footer className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  — {copy.grandma}
                </footer>
              </blockquote>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2 — HER TABLE: always room for one more ─────────────────── */}
      <Section tone="card" className={screen}>
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <Eyebrow>{copy.tableEyebrow}</Eyebrow>
              <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-[2.75rem]">{copy.tableTitle}</h2>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lg">
                {copy.tableBody}
              </p>
              <p className="mt-8 border-l-2 border-primary pl-5 font-heading text-xl leading-snug text-foreground sm:text-2xl">
                {spirit}
              </p>
            </div>

            <div className="grid grid-cols-5 gap-4 lg:col-span-7 lg:gap-5">
              <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/images/story-grandma-cooking.webp"
                  alt={copy.cookingAlt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 55vw"
                  className="object-cover object-[60%_center]"
                />
              </div>
              {/* 8/15 keeps it the same height as the 4/5 photo beside it (2 of 5 columns vs 3) */}
              <div className="relative col-span-2 aspect-[8/15] overflow-hidden rounded-3xl">
                <Image
                  src="/images/story-grandma-close.webp"
                  alt={copy.closeAlt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 36vw"
                  className="object-cover object-[45%_center]"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 3 — WHAT WE REMEMBER: the closing line set large ────────── */}
      <Section className={screen}>
        <Container size="wide" className="flex flex-col items-center text-center">
          <div className="relative size-24 overflow-hidden rounded-full border-2 border-gold sm:size-28">
            <Image
              src="/images/story-grandma-portrait.webp"
              alt=""
              fill
              sizes="112px"
              className="object-cover object-[50%_15%]"
            />
          </div>
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lg">
            {belief}
          </p>
          <h2 className="mt-8 max-w-5xl text-[2.25rem] leading-[1.1] sm:text-5xl lg:text-[4rem]">
            {remembered}
          </h2>
          <p className="mt-8 font-heading text-lg italic text-primary">{copy.closing}</p>
        </Container>
      </Section>

      {/* ── 4 — HER PORTRAIT ON EVERY PRODUCT ───────────────────────── */}
      <Section tone="card" className={`${screen} border-t border-border/60`}>
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>{copy.productsEyebrow}</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-[2rem] leading-[1.08] sm:text-[2.75rem]">
                {copy.productsTitle}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link href={paths.products[lang]} />}>
                {copy.productsCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" nativeButton={false} render={<Link href={paths.recipes[lang]} />}>
                {copy.recipesCta}
              </Button>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {labelled.map(({ product, category }) => (
              <li key={product.key}>
                <Link
                  href={productPath(lang, category.slug[lang], product.slug[lang])}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_18px_40px_-24px_rgba(46,31,21,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <MediaFrame
                    src={product.image}
                    alt={product.name[lang]}
                    tone={product.tone}
                    ratio="4/5"
                    rounded="rounded-none"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                    imageClassName="group-hover:scale-[1.03]"
                  />
                  <span className="flex flex-1 items-center justify-between gap-2 px-4 py-3.5 text-sm font-medium leading-snug">
                    {product.name[lang]}
                    <ArrowRight
                      className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
