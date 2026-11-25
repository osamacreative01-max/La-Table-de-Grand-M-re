import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { banners, storyPage } from "@/content/copy";
import { paths } from "@/lib/routes";
import type { Lang } from "@/content/types";

export function StoryView({ lang }: { lang: Lang }) {
  const copy = storyPage[lang];
  const [lead, ...rest] = copy.paragraphs;

  return (
    <main id="main">
      {/* Hero */}
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
              {lang === "fr" ? "Depuis la cuisine" : "From the kitchen"}
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

      {/* Story body */}
      <Section>
        <Container size="narrow">
          {/* Lead paragraph — larger */}
          <div className="relative mb-10 rounded-2xl bg-grain-rich p-7 md:p-9">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-brand"
            />
            <p className="font-heading text-[1.3rem] leading-snug text-foreground sm:text-[1.45rem]">
              {lead}
            </p>
          </div>

          {/* Rest of paragraphs */}
          <div className="flex flex-col gap-6 text-[1.03rem] leading-[1.8] text-foreground/82">
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          {/* Closing quote */}
          <figure className="mt-14 overflow-hidden rounded-2xl border border-brand/30 bg-brand-soft/40">
            <div className="border-b border-brand/20 px-7 py-5 md:px-9 md:py-7">
              <blockquote className="font-heading text-[1.25rem] leading-snug text-foreground sm:text-[1.4rem]">
                {copy.closing}
              </blockquote>
            </div>
            <div className="flex items-center gap-3 px-7 py-4 md:px-9">
              <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
              <figcaption className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                La Table de Grand-Mère · Québec
              </figcaption>
            </div>
          </figure>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="xl" nativeButton={false} render={<Link href={paths.products[lang]} />}
              className="shadow-md shadow-primary/15">
              {lang === "fr" ? "Découvrir nos produits" : "Discover Our Products"}
            </Button>
            <Button size="xl" variant="outline" nativeButton={false} render={<Link href={paths.recipes[lang]} />}>
              {lang === "fr" ? "Voir les recettes" : "See Recipes"}
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
