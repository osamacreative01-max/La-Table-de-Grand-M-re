export type Lang = "fr" | "en";

export type Localized = Record<Lang, string>;

export interface Category {
  key: string;
  slug: Localized;
  name: Localized;
  intro: Localized;
  /** Alt text / editorial caption for the category. */
  caption: Localized;
  /** Representative product photo in `public/`. */
  image?: string;
  tone: Tone;
}

export interface Product {
  key: string;
  category: string;
  slug: Localized;
  name: Localized;
  description: Localized;
  /** Product photo in `public/`. */
  image?: string;
  /** Package type, e.g. can, jar, pouch. */
  format?: Localized;
  /** Net weight exactly as supplied by the client. Omitted when unconfirmed. */
  netWeight?: string;
  /** Serving suggestion shown on the product page. */
  serving?: Localized;
  /** Storage instruction, used for frozen products. */
  storage?: Localized;
  tone: Tone;
}

export interface Recipe {
  key: string;
  slug: Localized;
  title: Localized;
  /** Short line shown on cards and under the recipe title. */
  summary: Localized;
  /** Alt text for the recipe illustration. */
  caption: Localized;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  /** Product keys from the catalogue used in this recipe, main product first. */
  products: string[];
  ingredients: Record<Lang, string[]>;
  steps: Record<Lang, string[]>;
  tip?: Localized;
  tone: Tone;
}

export type Tone ="cream" | "wheat" | "clay" | "sage" | "honey" | "cocoa" | "linen";
