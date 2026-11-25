import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/site/page-skeleton";
import { RecipeView } from "@/components/views/recipe-view";
import { recipes } from "@/content/recipes";
import { buildMetadata } from "@/lib/metadata";
import { findRecipe } from "@/lib/recipes";
import { recipePath } from "@/lib/routes";

type PageProps = { params: Promise<{ recipe: string }> };

export function generateStaticParams() {
  return recipes.map((recipe) => ({ recipe: recipe.slug.en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { recipe: slug } = await params;
  const recipe = findRecipe("en", slug);
  if (!recipe) return {};

  return buildMetadata({
    lang: "en",
    path: recipePath("en", slug),
    title: recipe.title.en + " | La Table de Grand-Mère",
    description: recipe.summary.en,
  });
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RecipePage params={params} />
    </Suspense>
  );
}

async function RecipePage({ params }: PageProps) {
  const { recipe: slug } = await params;
  const recipe = findRecipe("en", slug);
  if (!recipe) notFound();

  return <RecipeView lang="en" recipe={recipe} />;
}
