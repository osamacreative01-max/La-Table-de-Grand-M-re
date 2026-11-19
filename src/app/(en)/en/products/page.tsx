import type { Metadata } from "next";
import { ProductsView } from "@/components/views/products-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  path: paths.products.en,
  title: content.seo.products.en.title,
  description: content.productsPage.en.intro,
});

export default function Page() {
  return <ProductsView lang="en" />;
}
