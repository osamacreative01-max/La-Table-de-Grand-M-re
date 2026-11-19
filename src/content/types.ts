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
  tone: Tone;
}

export type Tone = "cream" | "wheat" | "clay" | "sage" | "honey" | "cocoa" | "linen";
