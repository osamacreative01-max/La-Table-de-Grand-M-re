import type { Metadata } from "next";
import { RecipesView } from "@/components/views/recipes-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  path: paths.recipes.en,
  title: content.seo.recipes.en.title,
  description: content.recipesPage.en.intro,
});

export default function Page() {
  return <RecipesView lang="en" />;
}
