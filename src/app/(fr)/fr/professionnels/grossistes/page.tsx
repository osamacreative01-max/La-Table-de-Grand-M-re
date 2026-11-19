import type { Metadata } from "next";
import { BuyerView } from "@/components/views/buyer-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "fr",
  path: paths.wholesale.fr,
  title: content.seo.business.fr.title,
  description: content.buyerPages.wholesale.fr.kicker,
});

export default function Page() {
  return <BuyerView lang="fr" page="wholesale" />;
}
