import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryView } from "@/components/views/category-view";
import { PageSkeleton } from "@/components/site/page-skeleton";
import { categories, products } from "@/content/catalog";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";

type PageProps = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug.en }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CategoryPage params={params} />
    </Suspense>
  );
}

async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug.en === slug);
  if (!category) notFound();

  const items = products.filter((product) => product.category === category.key);

  return <CategoryView lang="en" category={category} items={items} />;
}
