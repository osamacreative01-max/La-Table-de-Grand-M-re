import type { Metadata } from "next";
import { BusinessView } from "@/components/views/business-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "fr",
  path: paths.business.fr,
  title: content.seo.business.fr.title,
  description: content.businessPage.fr.kicker,
});

export default function Page() {
  return <BusinessView lang="fr" />;
}
