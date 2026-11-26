import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Container, Section } from "@/components/site/primitives";
import { BusinessCard } from "@/components/site/cards";
import { businessPage } from "@/content/copy";
import { paths } from "@/lib/routes";
import type { Lang } from "@/content/types";

const keyToPath = {
  retailers: paths.retailers,
  wholesale: paths.wholesale,
  foodservice: paths.foodservice,
} as const;

export function BusinessView({ lang }: { lang: Lang }) {
  const copy = businessPage[lang];

  return (
    <main id="main">
      <PageHero
        eyebrow={lang === "fr" ? "Espace professionnel" : "Business Enquiries"}
        title={copy.title}
        kicker={copy.kicker}
        image={{
          kind: "photo",
          src: "/images/business-spread.webp",
          alt: lang === "fr" ? "Des plats préparés avec les produits La Table de Grand-Mère" : "Dishes made with La Table de Grand-Mère products",
          position: "center",
        }}
      >
        <p>{copy.body}</p>
      </PageHero>

      <Section className="pt-6 md:pt-8">
        <Container size="wide">
          {/* Divider with label */}
          <div className="mb-10 flex items-center gap-4">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {lang === "fr" ? "Choisissez votre profil" : "Choose Your Profile"}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-border/70" />
          </div>

          <ul className="grid gap-5 md:grid-cols-3">
            {copy.cards.map((card, index) => (
              <li key={card.key}>
                <BusinessCard
                  index={String(index + 1).padStart(2, "0")}
                  title={card.title}
                  body={card.body}
                  href={keyToPath[card.key][lang]}
                />
              </li>
            ))}
          </ul>

          {/* Bottom CTA strip */}
          <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-border/60 bg-secondary/30 px-8 py-8 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="font-heading text-lg leading-snug">
                {lang === "fr"
                  ? "Une question avant de commencer?"
                  : "A question before you start?"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "fr"
                  ? "Contactez notre équipe directement depuis la page de contact."
                  : "Reach our team directly from the contact page."}
              </p>
            </div>
            <a
              href={paths.contact[lang]}
              className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-brand/60 hover:bg-brand-soft/50 hover:shadow-sm"
            >
              {lang === "fr" ? "Nous contacter" : "Contact Us"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
