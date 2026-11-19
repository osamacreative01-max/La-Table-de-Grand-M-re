import { brand } from "@/content/copy";
import type { Lang } from "@/content/types";
import { siteUrl } from "@/lib/metadata";

export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Escaped above; payload is generated from local content only.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function organizationSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brand.name,
    url: siteUrl,
    description:
      lang === "fr"
        ? "Aliments du garde-manger pour les repas du quotidien et les moments partagés."
        : "Pantry foods for everyday meals and the moments we share.",
    slogan: brand.line[lang],
    areaServed: "CA",
  };
}

export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brand.name,
    url: siteUrl,
    inLanguage: lang === "fr" ? "fr-CA" : "en-CA",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Product structured data without offers, prices, ratings or UPCs — those must
 * not be invented. Add `offers` only once the owner supplies verified data.
 */
export function productSchema({
  lang,
  name,
  description,
  category,
  url,
  image,
}: {
  lang: Lang;
  name: string;
  description: string;
  category: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    category,
    url,
    ...(image ? { image } : {}),
    brand: { "@type": "Brand", name: brand.name },
    inLanguage: lang === "fr" ? "fr-CA" : "en-CA",
  };
}
