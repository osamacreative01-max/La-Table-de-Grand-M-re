import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section } from "@/components/site/primitives";
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

      <PageHero
        eyebrow={businessPage[lang].title}
        title={copy.title}
        kicker={copy.kicker}
        image={{ kind: "product", src: buyerImages[page], alt: copy.caption, tone: tones[page] }}
      >
        <div className="flex flex-col gap-4">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <Button size="xl" nativeButton={false} render={<Link href="#enquiry" />}>
            {copy.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </PageHero>

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
