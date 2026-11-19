import type { Metadata } from "next";
import { PrivacyView } from "@/components/views/privacy-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "fr",
  path: paths.privacy.fr,
  title: content.seo.privacy.fr.title,
  description: content.privacyPage.fr.body[0],
  noindex: true,
});

export default function Page() {
  return <PrivacyView lang="fr" />;
}
