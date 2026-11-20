import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductView } from "@/components/views/product-view";
import { PageSkeleton } from "@/components/site/page-skeleton";
import { categories, products } from "@/content/catalog";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";

type PageProps = { params: Promise<{ category: string; product: string }> };

export function generateStaticParams() {
  return categories.flatMap((category) =>
    products
      .filter((product) => product.category === category.key)
      .map((product) => ({
        category: category.slug.fr,
        product: product.slug.fr,
      })),
  );
}

function resolve(categorySlug: string, productSlug: string) {
  const category = categories.find((item) => item.slug.fr === categorySlug);
  if (!category) return null;
  const product = products.find(
    (item) => item.slug.fr === productSlug && item.category === category.key,
  );
  if (!product) return null;
  return { category, product };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const found = resolve(categorySlug, productSlug);
  if (!found) return {};

  return buildMetadata({
    lang: "fr",
    path: paths.products.fr + "/" + categorySlug + "/" + productSlug,
    title: found.product.name.fr + " | La Table de Grand-Mère",
    description: "Découvrez " + found.product.name.fr + " de La Table de Grand-Mère et des idées pour l'ajouter à vos repas de tous les jours.",
  });
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductPage params={params} />
    </Suspense>
  );
}

async function ProductPage({ params }: PageProps) {
  const { category: categorySlug, product: productSlug } = await params;
  const found = resolve(categorySlug, productSlug);
  if (!found) notFound();

  return (
    <ProductView lang="fr" category={found.category} product={found.product} />
  );
}
