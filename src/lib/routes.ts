import type { Lang } from "@/content/types";

export type StaticKey =
  | "home"
  | "products"
  | "recipes"
  | "story"
  | "business"
  | "retailers"
  | "wholesale"
  | "foodservice"
  | "contact"
  | "privacy";

/** Every public URL, per language. French is the default. */
export const paths: Record<StaticKey, Record<Lang, string>> = {
  home: { fr: "/fr", en: "/en" },
  products: { fr: "/fr/produits", en: "/en/products" },
  recipes: { fr: "/fr/recettes", en: "/en/recipes" },
  story: { fr: "/fr/notre-histoire", en: "/en/our-story" },
  business: { fr: "/fr/professionnels", en: "/en/business" },
  retailers: { fr: "/fr/professionnels/detaillants", en: "/en/business/retailers" },
  wholesale: { fr: "/fr/professionnels/grossistes", en: "/en/business/wholesale" },
  foodservice: {
    fr: "/fr/professionnels/restauration",
    en: "/en/business/foodservice",
  },
  contact: { fr: "/fr/nous-joindre", en: "/en/contact" },
  privacy: {
    fr: "/fr/politique-de-confidentialite",
    en: "/en/privacy-policy",
  },
};

export function path(key: StaticKey, lang: Lang): string {
  return paths[key][lang];
}

export function categoryPath(lang: Lang, categorySlug: string): string {
  return `${paths.products[lang]}/${categorySlug}`;
}

export function productPath(
  lang: Lang,
  categorySlug: string,
  productSlug: string,
): string {
  return `${paths.products[lang]}/${categorySlug}/${productSlug}`;
}

export function recipePath(lang: Lang, recipeSlug: string): string {
  return `${paths.recipes[lang]}/${recipeSlug}`;
}

/** The equivalent page in the other language, for the FR/EN switch. */
export const otherLang: Record<Lang, Lang> = { fr: "en", en: "fr" };
