import type { Metadata, Viewport } from "next";
import { fraunces, inter } from "@/lib/fonts";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/site/json-ld";
import { rootMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = rootMetadata.en;

export const viewport: Viewport = {
  themeColor: "#faf5ea",
  colorScheme: "light",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader lang="en" />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter lang="en" />
        <JsonLd data={organizationSchema("en")} />
        <JsonLd data={websiteSchema("en")} />
      </body>
    </html>
  );
}
