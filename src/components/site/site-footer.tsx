import Link from "next/link";
import { MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/site/primitives";
import { brand, businessSubnav, nav, ui } from "@/content/copy";
import { paths } from "@/lib/routes";
import { cn } from "@/lib/utils";
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

/** A footer list: a gold diamond bullet before each link. */
function FooterList({
  items,
  className = "mt-4",
}: {
  items: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group inline-flex min-h-10 items-center gap-3 text-[0.95rem] text-ink-foreground/85 transition-colors hover:text-ink-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rotate-45 bg-gold transition-transform group-hover:scale-125"
            />
            <span className="underline-offset-4 group-hover:underline">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-heading text-xl text-gold-light">{children}</p>;
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const fr = lang === "fr";

  const navItems = nav[lang]
    .filter((item) => item.key !== "home" && item.key !== "business")
    .map((item) => ({ href: navHref[item.key][lang], label: item.label }));
  const businessItems = businessSubnav[lang].map((child) => ({
    href: subHref[child.key][lang],
    label: child.label,
  }));

  return (
    <footer className="closing mt-auto border-t-4 border-gold bg-ink text-ink-foreground">
      <Container size="wide" className="py-12 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-4">
              <Logo alt="La Table de Grand-Mère" className="h-16 sm:h-16" />
              <p className="font-heading text-xl leading-snug text-ink-foreground">
                {brand.line[lang]}
              </p>
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink-foreground/85">
              {fr
                ? "Des aliments du garde-manger pour les repas du quotidien et les moments qu'on aime partager."
                : "Pantry foods for everyday meals and the moments we love to share."}
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label={fr ? "Navigation du pied de page" : "Footer navigation"}>
            <FooterHeading>{fr ? "Navigation" : "Navigation"}</FooterHeading>
            <FooterList items={navItems} />
          </nav>

          <div className="lg:col-span-3">
            <FooterHeading>{t.business}</FooterHeading>
            <FooterList items={businessItems} />
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>{fr ? "Nous trouver" : "Find Us"}</FooterHeading>
            <p className="mt-4 flex min-h-10 items-center gap-3 text-[0.95rem] text-ink-foreground/85">
              <MapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
              Québec, Canada
            </p>
            <FooterList
              className="mt-0"
              items={[{ href: paths.contact[lang], label: fr ? "Nous écrire" : "Write to Us" }]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-foreground/15 pt-5 text-sm text-ink-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {brand.name}. {t.copyright}
          </p>
          <Link
            href={paths.privacy[lang]}
            className="inline-flex min-h-10 items-center underline-offset-4 hover:text-ink-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {t.privacy}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
