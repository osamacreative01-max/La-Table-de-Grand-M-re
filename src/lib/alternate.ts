import { categories, products } from "@/content/catalog";
import { paths } from "@/lib/routes";
import type { Lang } from "@/content/types";

const frToKey: Record<string, keyof typeof paths> = {
  "": "home",
  produits: "products",
  recettes: "recipes",
  "notre-histoire": "story",
  professionnels: "business",
  detaillants: "retailers",
  grossistes: "wholesale",
  restauration: "foodservice",
  "nous-joindre": "contact",
  "politique-de-confidentialite": "privacy",
};

const enToKey: Record<string, keyof typeof paths> = {
  "": "home",
  products: "products",
  recipes: "recipes",
  "our-story": "story",
  business: "business",
  retailers: "retailers",
  wholesale: "wholesale",
  foodservice: "foodservice",
  contact: "contact",
  "privacy-policy": "privacy",
};

const businessChildren = new Set(["retailers", "wholesale", "foodservice"]);

function findCategory(lang: Lang, slug: string) {
  return categories.find((category) => category.slug[lang] === slug);
}

function findProduct(lang: Lang, slug: string) {
  return products.find((product) => product.slug[lang] === slug);
}

/**
 * Maps any public URL to its equivalent in the other language, keeping the
 * visitor on the same page. Used by the FR/EN switch and the `hreflang` tags.
 */
export function alternatePath(pathname: string, to: Lang): string {
  const parts = pathname.split("/").filter(Boolean);
  const from: Lang = parts[0] === "en" ? "en" : "fr";
  const segments = parts.slice(1);

  if (segments.length === 0) return paths.home[to];

  const map = from === "fr" ? frToKey : enToKey;
  const key = map[segments[0]];

  if (!key) return paths.home[to];

  if (key === "products") {
    const [, categorySlug, productSlug] = segments;
    if (!categorySlug) return paths.products[to];

    const category = findCategory(from, categorySlug);
    if (!category) return paths.products[to];

    if (!productSlug) {
      return `${paths.products[to]}/${category.slug[to]}`;
    }

    const product = findProduct(from, productSlug);
    if (!product) return `${paths.products[to]}/${category.slug[to]}`;

    return `${paths.products[to]}/${category.slug[to]}/${product.slug[to]}`;
  }

  if (key === "business" && segments[1]) {
    // only the three buyer sub-pages exist under business
    const child = segments[1] as keyof typeof paths;
    if (businessChildren.has(child)) {
      return paths[child][to];
    }
    return paths.business[to];
  }

  return paths[key][to];
}

export function alternatePaths(pathname: string) {
  return {
    fr: alternatePath(pathname, "fr"),
    en: alternatePath(pathname, "en"),
  };
}
