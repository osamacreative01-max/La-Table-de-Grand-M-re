import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "fr",
  path: paths.contact.fr,
  title: content.seo.contact.fr.title,
  description: content.contactPage.fr.body,
});

export default function Page() {
  return <ContactView lang="fr" />;
}
