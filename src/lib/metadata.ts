import type { Metadata } from "next";
import { brand } from "@/content/copy";
import { alternatePaths } from "@/lib/alternate";
import { paths } from "@/lib/routes";
import type { Lang } from "@/content/types";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://latabledegrandmere.ca";

export const locales: Lang[] = ["fr", "en"];

export const hreflang: Record<Lang, string> = {
  fr: "fr-CA",
  en: "en-CA",
};

export function absolute(path: string) {
  return `${siteUrl}${path}`;
}

/**
 * Builds page metadata with canonical + hreflang alternates pointing at the
 * equivalent page in the other language.
 */
export function buildMetadata({
  lang,
  path,
  title,
  description,
  noindex = false,
}: {
  lang: Lang;
  path: string;
  title: string;
  description?: string;
  noindex?: boolean;
}): Metadata {
  const alternates = alternatePaths(path);

  return {
    title,
    description,
    alternates: {
      canonical: absolute(alternates[lang]),
      languages: {
        "fr-CA": absolute(alternates.fr),
        "en-CA": absolute(alternates.en),
        "x-default": absolute(alternates.fr),
      },
    },
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: lang === "fr" ? "en_CA" : "fr_CA",
      url: absolute(alternates[lang]),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

export const rootMetadata: Record<Lang, Metadata> = {
  fr: {
    metadataBase: new URL(siteUrl),
    applicationName: brand.name,
    other: { "og:locale:alternate": "en_CA" },
  },
  en: {
    metadataBase: new URL(siteUrl),
    applicationName: brand.name,
    other: { "og:locale:alternate": "fr_CA" },
  },
};

export { paths };
