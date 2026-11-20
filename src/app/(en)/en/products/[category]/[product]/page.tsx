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
        category: category.slug.en,
        product: product.slug.en,
      })),
  );
}

function resolve(categorySlug: string, productSlug: string) {
  const category = categories.find((item) => item.slug.en === categorySlug);
  if (!category) return null;
  const product = products.find(
    (item) => item.slug.en === productSlug && item.category === category.key,
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
    lang: "en",
    path: paths.products.en + "/" + categorySlug + "/" + productSlug,
    title: found.product.name.en + " | La Table de Grand-Mère",
    description: "Discover " + found.product.name.en + " from La Table de Grand-Mère and ideas for adding it to your everyday meals.",
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
    <ProductView lang="en" category={found.category} product={found.product} />
  );
}
