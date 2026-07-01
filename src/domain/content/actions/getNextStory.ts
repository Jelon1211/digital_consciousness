"use server";

import { getStory } from "@/domain/content/actions/getStory";
import {
  getNextStoryTarget,
  StoryTarget,
} from "@/domain/content/navigation/getNextStoryTarget";
import { PreparedStoryI } from "@/domain/content/story.types";

export type NextStoryResult = StoryTarget & {
  story: PreparedStoryI[] | null;
};

export async function getNextStory(
  currentSector?: string,
  currentNode?: string,
): Promise<NextStoryResult | null> {
  const target = getNextStoryTarget(currentSector, currentNode);

  if (!target) {
    return null;
  }

  const story = await getStory(target.storyPath);

  return {
    ...target,
    story,
  };
}
