import type { Metadata } from "next";
import { HomeView } from "@/components/views/home-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "fr",
  path: paths.home.fr,
  title: content.seo.home.fr.title,
  description: content.seo.home.fr.description,
});

export default function Page() {
  return <HomeView lang="fr" />;
}
