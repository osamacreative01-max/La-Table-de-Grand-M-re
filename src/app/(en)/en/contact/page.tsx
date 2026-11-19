import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  path: paths.contact.en,
  title: content.seo.contact.en.title,
  description: content.contactPage.en.body,
});

export default function Page() {
  return <ContactView lang="en" />;
}
