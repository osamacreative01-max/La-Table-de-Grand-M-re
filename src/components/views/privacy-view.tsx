import { PageHero } from "@/components/site/page-hero";
import { Container, Section } from "@/components/site/primitives";
import { privacyPage } from "@/content/copy";
import type { Lang } from "@/content/types";

export function PrivacyView({ lang }: { lang: Lang }) {
  const copy = privacyPage[lang];

  return (
    <main id="main">
      <PageHero eyebrow={lang === "fr" ? "Légal" : "Legal"} title={copy.title} />
      <Section>
        <Container size="wide">
          <div className="flex max-w-3xl flex-col gap-5 text-[1.05rem] leading-relaxed text-foreground/85">
            {copy.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
