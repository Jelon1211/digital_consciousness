"use server";

import { JsonInterface } from "@/types/JsonInterface";
import { GetJson } from "../utils/GetJson";

export async function getStoryFromServer(
  path: string
): Promise<JsonInterface[] | null> {
  try {
    const story = await GetJson.loadJson<JsonInterface[]>(path);
    return story;
  } catch (err) {
    return null;
  }
}
