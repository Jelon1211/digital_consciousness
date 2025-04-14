"use server";

import { JsonInterface } from "@/types/JsonInterface";
import { GetJson } from "../GetJson";

export async function getStoryFromServer(path: string) {
  const story = await GetJson.loadJson<JsonInterface[]>(path);
  return story;
}
