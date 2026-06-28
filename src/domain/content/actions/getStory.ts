"use server";

import { JsonInterface } from "@/domain/content/story.types";
import { loadStoryContent } from "@/domain/content/contentRepository";

export async function getStory(path: string): Promise<JsonInterface[] | null> {
  try {
    return await loadStoryContent(path);
  } catch (err) {
    console.error("Error loading story:", err);
    return null;
  }
}
