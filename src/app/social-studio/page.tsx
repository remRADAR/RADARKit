import type { Metadata } from "next";
import { StoryComposer } from "@/components/social-studio/story-composer";

export const metadata: Metadata = {
  title: "Social Studio",
  description: "Create and export a full-bleed RADAR 9:16 article story asset.",
};

export default function SocialStudioPage() {
  return <StoryComposer />;
}
