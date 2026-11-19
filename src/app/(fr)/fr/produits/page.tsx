import type { Metadata } from "next";
import { ProductsView } from "@/components/views/products-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "fr",
  path: paths.products.fr,
  title: content.seo.products.fr.title,
  description: content.productsPage.fr.intro,
});

export default function Page() {
  return <ProductsView lang="fr" />;
}
