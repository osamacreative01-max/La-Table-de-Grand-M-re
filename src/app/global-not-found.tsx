import type { Metadata } from "next";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/site/primitives";
import { NotFoundContent } from "@/components/views/not-found-view";
import { fraunces, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page introuvable · Page not found | La Table de Grand-Mère",
  robots: { index: false, follow: false },
};

/**
 * 404 for URLs that match no route. The site has one root layout per language,
 * so this page renders on its own and shows both languages, French first.
 */
export default function GlobalNotFound() {
  return (
    <html lang="fr-CA" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-grain-rich">
        <main id="main" className="flex flex-1 items-center">
          <Container size="wide" className="py-16 md:py-24">
            <Logo alt="La Table de Grand-Mère" />
            <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16">
              <NotFoundContent lang="fr" />
              <div lang="en-CA" className="border-t border-border/60 pt-14 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                <NotFoundContent lang="en" heading="h2" />
              </div>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
