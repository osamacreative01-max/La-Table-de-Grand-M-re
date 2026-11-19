import type { Metadata } from "next";
import { RecipesView } from "@/components/views/recipes-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "fr",
  path: paths.recipes.fr,
  title: content.seo.recipes.fr.title,
  description: content.recipesPage.fr.intro,
});

export default function Page() {
  return <RecipesView lang="fr" />;
}
