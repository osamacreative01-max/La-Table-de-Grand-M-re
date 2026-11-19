import type { Metadata } from "next";
import { BuyerView } from "@/components/views/buyer-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  path: paths.wholesale.en,
  title: content.seo.business.en.title,
  description: content.buyerPages.wholesale.en.kicker,
});

export default function Page() {
  return <BuyerView lang="en" page="wholesale" />;
}
