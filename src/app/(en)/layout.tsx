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
      <body className="flex min-h-dvh flex-col pt-[97px] lg:pt-[113px]">
        <SiteHeader lang="en" />
        {children}
        <SiteFooter lang="en" />
        <JsonLd data={organizationSchema("en")} />
        <JsonLd data={websiteSchema("en")} />
      </body>
    </html>
  );
}
