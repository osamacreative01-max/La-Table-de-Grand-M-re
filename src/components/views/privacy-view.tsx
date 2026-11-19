import { Container, Eyebrow } from "@/components/site/primitives";
import { privacyPage } from "@/content/copy";
import type { Lang } from "@/content/types";

export function PrivacyView({ lang }: { lang: Lang }) {
  const copy = privacyPage[lang];

  return (
    <main id="main">
      <Container size="narrow" className="py-16 md:py-24">
        <Eyebrow>{lang === "fr" ? "Légal" : "Legal"}</Eyebrow>
        <h1 className="mt-5 text-[2.2rem] leading-tight sm:text-4xl">{copy.title}</h1>
        <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
          {copy.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </main>
  );
}
