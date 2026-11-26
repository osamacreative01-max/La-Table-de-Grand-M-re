import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/site/primitives";
import { brand, businessSubnav, nav, ui } from "@/content/copy";
import { paths } from "@/lib/routes";
import type { Lang } from "@/content/types";

const navHref: Record<string, Record<Lang, string>> = {
  home: paths.home,
  products: paths.products,
  recipes: paths.recipes,
  story: paths.story,
  business: paths.business,
  contact: paths.contact,
};

const subHref: Record<string, Record<Lang, string>> = {
  retailers: paths.retailers,
  wholesale: paths.wholesale,
  foodservice: paths.foodservice,
};

/** Cached so the year is frozen at build time instead of read during render. */
async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = ui[lang];

  return (
    <footer className="closing mt-auto border-t-4 border-gold bg-ink text-ink-foreground">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6 lg:pr-24">
            <Logo alt="La Table de Grand-Mère" className="h-24" />
            <p className="mt-5 font-heading text-xl leading-snug text-ink-foreground/85">
              {brand.line[lang]}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-foreground/80">
              {lang === "fr"
                ? "Des aliments du garde-manger pour les repas du quotidien et les moments qu'on aime partager."
                : "Pantry foods for everyday meals and the moments we love to share."}
            </p>

            {/* Social / contact placeholder */}
            <div className="mt-7 flex items-center gap-2">
              <div className="rounded-full border border-ink-foreground/20 px-3.5 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink-foreground/75">
                Québec, Canada
              </div>
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label={lang === "fr" ? "Navigation du pied de page" : "Footer navigation"}>
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-ink-foreground/75">
              {lang === "fr" ? "Navigation" : "Navigation"}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {nav[lang]
                .filter((item) => item.key !== "home")
                .map((item) => (
                  <li key={item.key}>
                    <Link
                      href={navHref[item.key][lang]}
                      className="text-ink-foreground/75 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-ink-foreground/75">
              {t.business}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {businessSubnav[lang].map((child) => (
                <li key={child.key}>
                  <Link
                    href={subHref[child.key][lang]}
                    className="text-ink-foreground/75 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={paths.privacy[lang]}
                  className="text-ink-foreground/75 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
                >
                  {t.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-foreground/10 pt-6 text-xs text-ink-foreground/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {brand.name}. {t.copyright}
          </p>
          <p className="font-heading text-[0.8rem] italic text-ink-foreground/80">
            {lang === "fr" ? "Le goût de se retrouver." : "The Taste of Coming Together."}
          </p>
        </div>
      </Container>
    </footer>
  );
}
