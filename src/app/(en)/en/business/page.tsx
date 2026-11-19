import type { Metadata } from "next";
import { BusinessView } from "@/components/views/business-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  path: paths.business.en,
  title: content.seo.business.en.title,
  description: content.businessPage.en.kicker,
});

export default function Page() {
  return <BusinessView lang="en" />;
}
