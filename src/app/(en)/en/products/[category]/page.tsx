import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/views/category-view";
import { categories, products } from "@/content/catalog";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug.en }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug.en === slug);
  if (!category) return {};

  return buildMetadata({
    lang: "en",
    path: paths.products.en + "/" + slug,
    title: category.name.en + " | La Table de Grand-Mère",
    description: category.intro.en,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug.en === slug);
  if (!category) notFound();

  const items = products.filter((product) => product.category === category.key);

  return <CategoryView lang="en" category={category} items={items} />;
}
