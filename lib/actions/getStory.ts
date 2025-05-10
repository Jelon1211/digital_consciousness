"use server";

import { JsonInterface } from "@/types/JsonInterface";
import { GetJson } from "../utils/GetJson";

export async function getStory(path: string): Promise<JsonInterface[] | null> {
  try {
    console.log("Fetching story from server:", path);
    const story = await GetJson.loadJson<JsonInterface[]>(path);
    return story;
  } catch (err) {
    return null;
  }
}
