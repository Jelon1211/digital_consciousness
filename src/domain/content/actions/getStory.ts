"use server";

import { JsonInterface, PreparedStoryI } from "@/domain/content/story.types";
import { loadStoryContent } from "@/domain/content/contentRepository";

export async function getStory(path: string): Promise<PreparedStoryI[] | null> {
  try {
    const loadedStoryContent = await loadStoryContent(path);

    return prepareStory(loadedStoryContent);
  } catch (err) {
    console.error("Error loading story:", err);
    return null;
  }
}

function prepareStory(story: JsonInterface[]): PreparedStoryI[] {
  return story.map((item, index) => ({
    ...item,
    id: index,
  }));
}
