"use server";

import { JsonInterface } from "@/types/JsonInterface";
import { GetStory } from "../GetStory";

export async function getStoryFromServer(path: string) {
  const story = await GetStory.loadJson<JsonInterface[]>(path);
  return story;
}
