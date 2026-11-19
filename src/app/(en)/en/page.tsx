import type { Metadata } from "next";
import { HomeView } from "@/components/views/home-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  path: paths.home.en,
  title: content.seo.home.en.title,
  description: content.seo.home.en.description,
});

export default function Page() {
  return <HomeView lang="en" />;
}
