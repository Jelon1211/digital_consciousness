import { JsonInterface } from "@/types/JsonInterface";
import { getStoryFromServer } from "./actions/getStoryFromServer";

type CommandFn = () => Promise<JsonInterface[] | null>;

export const commandMap: Record<string, CommandFn> = {
  start: async () => {
    const story = await getStoryFromServer("/introduction.json");
    return story;
  },
  init: async () => {
    const story = await getStoryFromServer("/init.json");
    return story;
  },
  logs: async () => {
    const story = await getStoryFromServer("/logs/logs.json");
    return story;
  },
  clear: async () => {
    return [];
  },
  help: async () => {
    const story = await getStoryFromServer("/help.json");
    return story;
  },
};
