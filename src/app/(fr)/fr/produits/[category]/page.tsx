import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/views/category-view";
import { categories, products } from "@/content/catalog";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug.fr }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug.fr === slug);
  if (!category) return {};

  return buildMetadata({
    lang: "fr",
    path: paths.products.fr + "/" + slug,
    title: category.name.fr + " | La Table de Grand-Mère",
    description: category.intro.fr,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug.fr === slug);
  if (!category) notFound();

  const items = products.filter((product) => product.category === category.key);

  return <CategoryView lang="fr" category={category} items={items} />;
}
