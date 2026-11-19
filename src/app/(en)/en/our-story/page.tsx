import type { Metadata } from "next";
import { StoryView } from "@/components/views/story-view";
import { buildMetadata } from "@/lib/metadata";
import { paths } from "@/lib/routes";
import * as content from "@/content/copy";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  path: paths.story.en,
  title: content.seo.story.en.title,
  description: content.storyPage.en.kicker,
});

export default function Page() {
  return <StoryView lang="en" />;
}
