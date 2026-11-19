import type { Metadata } from "next";
import { PrivacyView } from "@/components/views/privacy-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  path: paths.privacy.en,
  title: content.seo.privacy.en.title,
  description: content.privacyPage.en.body[0],
  noindex: true,
});

export default function Page() {
  return <PrivacyView lang="en" />;
}
