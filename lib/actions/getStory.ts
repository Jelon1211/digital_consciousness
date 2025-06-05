"use server";

import { JsonInterface } from "@/types/JsonInterface";
import { GetJson } from "../utils/GetJson";

export async function getStory(path: string): Promise<JsonInterface[] | null> {
  try {
    const story = await GetJson.loadJson<JsonInterface[]>(path);
    return story;
  } catch (err) {
    console.error("Error loading story:", err);
    return null;
  }
}
