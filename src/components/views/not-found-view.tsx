import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/routes";
import type { Lang } from "@/content/types";

const copy = {
  fr: {
    eyebrow: "Erreur 404",
    title: "Cette page n'est plus sur la table.",
    body: "La page que vous cherchez a peut-être été déplacée ou n'existe pas. Revenez à l'accueil ou parcourez nos produits et nos recettes.",
    home: "Retour à l'accueil",
    products: "Nos produits",
    recipes: "Nos recettes",
  },
  en: {
    eyebrow: "Error 404",
    title: "This page is no longer on the table.",
    body: "The page you're looking for may have moved or doesn't exist. Head back home or browse our products and recipes.",
    home: "Back to home",
    products: "Our products",
    recipes: "Our recipes",
  },
} as const;

/** Shared 404 content, used by each language's `not-found.tsx`. */
export function NotFoundContent({
  lang,
  heading: Heading = "h1",
}: {
  lang: Lang;
  heading?: "h1" | "h2";
}) {
  const t = copy[lang];
  return (
    <div className="max-w-2xl">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-primary">
        {t.eyebrow}
      </p>
      <Heading className="mt-5 text-[2.4rem] leading-[1.05] tracking-[-0.02em] sm:text-5xl">
        {t.title}
      </Heading>
      <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground">{t.body}</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button size="lg" nativeButton={false} render={<Link href={paths.home[lang]} />}>
          {t.home}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href={paths.products[lang]} />}
        >
          {t.products}
        </Button>
        <Button
          size="lg"
          variant="ghost"
          nativeButton={false}
          render={<Link href={paths.recipes[lang]} />}
        >
          {t.recipes}
        </Button>
      </div>
    </div>
  );
}

export function NotFoundView({ lang }: { lang: Lang }) {
  return (
    <main id="main" className="flex flex-1 items-center bg-grain-rich">
      <Container size="wide" className="py-24 md:py-32">
        <NotFoundContent lang={lang} />
      </Container>
    </main>
  );
}
