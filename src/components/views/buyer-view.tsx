import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section } from "@/components/site/primitives";
import { MediaFrame } from "@/components/site/media-frame";
import { Button } from "@/components/ui/button";
import { BusinessForm } from "@/components/forms/business-form";
import { buyerPages, forms, businessPage, ui } from "@/content/copy";
import { paths } from "@/lib/routes";
import type { Lang } from "@/content/types";

export type BuyerKey = "retailers" | "wholesale" | "foodservice";

const tones = {
  retailers: "wheat",
  wholesale: "linen",
  foodservice: "cocoa",
} as const;

const buyerImages = {
  retailers: "/products/mixed-vegetables.webp",
  wholesale: "/products/red-kidney-beans.webp",
  foodservice: "/products/chick-peas.webp",
} as const;

export function BuyerView({ lang, page }: { lang: Lang; page: BuyerKey }) {
  const copy = buyerPages[page][lang];
  const formCopy = forms[lang].business;
  const t = ui[lang];

  return (
    <main id="main">
      <Breadcrumbs
        label={t.breadcrumb}
        items={[
          { label: t.home, href: paths.home[lang] },
          { label: businessPage[lang].title, href: paths.business[lang] },
          { label: copy.title },
        ]}
      />

      <section className="relative overflow-hidden bg-grain-rich">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.86 0.065 78 / 0.2), transparent 70%)" }}
        />
        <Container size="wide" className="relative py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand-soft/60 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brand-foreground/75">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                {businessPage[lang].title}
              </div>
              <h1 className="mt-5 text-[2.2rem] leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-5 font-heading text-xl leading-snug text-brand-foreground/80">
                {copy.kicker}
              </p>
              <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8">
                <Button size="xl" nativeButton={false} render={<Link href="#enquiry" />}
                  className="shadow-md shadow-primary/15">
                  {copy.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl border border-brand/15"
                style={{ transform: "rotate(1.5deg)" }}
              />
              <MediaFrame
                src={buyerImages[page]}
                alt={copy.caption}
                tone={tones[page]}
                ratio="4/3"
                rounded="rounded-[1.75rem]"
                priority
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="relative shadow-[0_32px_64px_-32px_rgba(72,48,28,0.55)]"
                
              />
            </div>
          </div>
        </Container>
      </section>

      <Section
        id="enquiry"
        tone="card"
        className="scroll-mt-24 border-t border-border/60"
      >
        <Container size="default">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight tracking-[-0.015em]">{formCopy.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {lang === "fr"
                ? "Remplissez le formulaire ci-dessous et notre équipe communiquera avec vous."
                : "Complete the form below and our team will get in touch with you."}
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-border/70 bg-card p-7 shadow-sm shadow-black/[0.03] md:p-9">
            <BusinessForm lang={lang} />
          </div>

          <div className="mt-10">
            <Link
              href={paths.business[lang]}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {businessPage[lang].title}
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
