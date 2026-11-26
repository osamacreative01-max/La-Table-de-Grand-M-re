import type { Metadata, Viewport } from "next";
import { fraunces, inter } from "@/lib/fonts";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/site/json-ld";
import { rootMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = rootMetadata.fr;

export const viewport: Viewport = {
  themeColor: "#faf5ea",
  colorScheme: "light",
};

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col pt-[97px] lg:pt-[113px]">
        <SiteHeader lang="fr" />
        {children}
        <SiteFooter lang="fr" />
        <JsonLd data={organizationSchema("fr")} />
        <JsonLd data={websiteSchema("fr")} />
      </body>
    </html>
  );
}
