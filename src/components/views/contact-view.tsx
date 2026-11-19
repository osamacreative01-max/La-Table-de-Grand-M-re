import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/site/primitives";
import { ContactForm } from "@/components/forms/contact-form";
import { contactPage } from "@/content/copy";
import type { Lang } from "@/content/types";

export function ContactView({ lang }: { lang: Lang }) {
  const copy = contactPage[lang];

  return (
    <main id="main">
      {/* Hero strip */}
      <section className="relative overflow-hidden bg-grain-rich">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.88 0.06 78 / 0.18), transparent 70%)" }}
        />
        <Container size="wide" className="relative py-14 md:py-20">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand-soft/60 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-brand-foreground/75">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            {lang === "fr" ? "Écrivez-nous" : "Write to us"}
          </div>
          <h1 className="mt-5 max-w-2xl text-[2.4rem] leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-lg font-heading text-[1.25rem] leading-snug text-brand-foreground/80">
            {copy.kicker}
          </p>
        </Container>
      </section>

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
                {lang === "fr" ? "Envoyez-nous un message" : "Send us a message"}
              </h2>
              <ContactForm lang={lang} />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
