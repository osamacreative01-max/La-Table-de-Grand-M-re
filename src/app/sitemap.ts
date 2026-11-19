import type { MetadataRoute } from "next";
import { categories, products } from "@/content/catalog";
import { paths } from "@/lib/routes";
import { siteUrl } from "@/lib/metadata";

type RoutePair = { fr: string; en: string; priority: number };

const staticKeys = [
  "home",
  "products",
  "recipes",
  "story",
  "business",
  "retailers",
  "wholesale",
  "foodservice",
  "contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pairs: RoutePair[] = staticKeys.map((key) => ({
    fr: paths[key].fr,
    en: paths[key].en,
    priority: key === "home" ? 1 : 0.7,
  }));

  for (const category of categories) {
    pairs.push({
      fr: `${paths.products.fr}/${category.slug.fr}`,
      en: `${paths.products.en}/${category.slug.en}`,
      priority: 0.6,
    });
  }

  for (const product of products) {
    const category = categories.find((item) => item.key === product.category);
    if (!category) continue;
    pairs.push({
      fr: `${paths.products.fr}/${category.slug.fr}/${product.slug.fr}`,
      en: `${paths.products.en}/${category.slug.en}/${product.slug.en}`,
      priority: 0.5,
    });
  }

  return pairs.flatMap(({ fr, en, priority }) =>
    (["fr", "en"] as const).map((lang) => ({
      url: `${siteUrl}${lang === "fr" ? fr : en}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          "fr-CA": `${siteUrl}${fr}`,
          "en-CA": `${siteUrl}${en}`,
        },
      },
    })),
  );
}
