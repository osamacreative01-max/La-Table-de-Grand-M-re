import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Container, Section } from "@/components/site/primitives";
import { ContactForm } from "@/components/forms/contact-form";
import { contactPage } from "@/content/copy";
import type { Lang } from "@/content/types";

export function ContactView({ lang }: { lang: Lang }) {
  const copy = contactPage[lang];

  return (
    <main id="main">
      <PageHero
        eyebrow={lang === "fr" ? "Écrivez-nous" : "Write to Us"}
        title={copy.title}
        kicker={copy.kicker}
        image={{
          kind: "photo",
          src: "/images/story-grandma-cooking.webp",
          alt: lang === "fr" ? "Grand-maman cuisine avec sa petite-fille" : "Grandma cooking with her granddaughter",
          position: "center 35%",
        }}
      />

      <Section className="pb-20 pt-10 md:pb-28 md:pt-14">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Left: info */}
            <div className="max-w-lg">
              <p className="text-base leading-relaxed text-muted-foreground">
                {copy.body}
              </p>

              {/* Info cards */}
              <ul className="mt-8 flex flex-col gap-4">
                <li className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand-soft/60">
                    <MessageCircle className="size-5 text-brand-foreground/70" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      {lang === "fr" ? "Formulaire en ligne" : "Online Form"}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {lang === "fr"
                        ? "Remplissez le formulaire ci-contre et nous vous répondrons sous peu."
                        : "Fill out the form and we'll get back to you shortly."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand-soft/60">
                    <Mail className="size-5 text-brand-foreground/70" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      {lang === "fr" ? "Renseignements" : "Information"}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {lang === "fr"
                        ? "Pour toute question au sujet de nos produits ou de nos gammes."
                        : "For any question about our products or ranges."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand-soft/60">
                    <MapPin className="size-5 text-brand-foreground/70" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Québec, Canada</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {lang === "fr"
                        ? "Fièrement d'ici."
                        : "Proudly from here."}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: form */}
            <div className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm shadow-black/[0.04] md:p-9">
              <h2 className="mb-6 text-xl leading-snug">
                {lang === "fr" ? "Envoyez-nous un message" : "Send Us a Message"}
              </h2>
              <ContactForm lang={lang} />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
