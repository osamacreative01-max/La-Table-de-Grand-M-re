import type { Metadata } from "next";
import { StoryView } from "@/components/views/story-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "fr",
  path: paths.story.fr,
  title: content.seo.story.fr.title,
  description: content.storyPage.fr.kicker,
});

export default function Page() {
  return <StoryView lang="fr" />;
}
