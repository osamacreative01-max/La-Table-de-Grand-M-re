import { categories, products } from "@/content/catalog";
import { recipePage } from "@/content/copy";
import { recipes } from "@/content/recipes";
import { productPath, recipePath } from "@/lib/routes";
import type { Lang, Recipe } from "@/content/types";

export function findRecipe(lang: Lang, slug: string) {
  return recipes.find((recipe) => recipe.slug[lang] === slug);
}

/** Catalogue products used in a recipe, with their public URL. */
export function recipeProducts(recipe: Recipe, lang: Lang) {
  return recipe.products.flatMap((key) => {
    const product = products.find((item) => item.key === key);
    const category = product && categories.find((item) => item.key === product.category);
    if (!product || !category) return [];
    return [
      {
        product,
        category,
        href: productPath(lang, category.slug[lang], product.slug[lang]),
      },
    ];
  });
}

export function totalMinutes(recipe: Recipe) {
  return recipe.prepMinutes + recipe.cookMinutes;
}

/** Props for `<RecipeCard>` so every listing renders recipes the same way. */
export function recipeCardProps(recipe: Recipe, lang: Lang, index: number) {
  const main = recipeProducts(recipe, lang)[0]?.product;
  return {
    title: recipe.title[lang],
    caption: recipe.caption[lang],
    summary: recipe.summary[lang],
    tone: recipe.tone,
    index,
    href: recipePath(lang, recipe.slug[lang]),
    note: `${totalMinutes(recipe)} ${recipePage[lang].minutes}`,
    label: recipePage[lang].viewRecipe,
    image: main?.image,
    photo: recipe.photo,
    imageAlt: main ? main.name[lang] : undefined,
  };
}
