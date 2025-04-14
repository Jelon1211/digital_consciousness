import { JsonInterface } from "@/types/JsonInterface";
import { getStoryFromServer } from "./actions/getStoryFromServer";

type CommandFn = () => Promise<JsonInterface[] | null>;

export const commandMap: Record<string, CommandFn> = {
  // region init
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
  // endregion

  // region sector_01
  sectors: async () => {
    const story = await getStoryFromServer("/logs/sectors/sectors.json");
    return story;
  },
  sector_01: async () => {
    const story = await getStoryFromServer(
      "/logs/sectors/data_sediment_01/sector_01.json"
    );
    return story;
  },
  node_00: async () => {
    const story = await getStoryFromServer(
      "/logs/sectors/data_sediment_01/node_01/node_00.json"
    );
    return story;
  },
  node_01: async () => {
    const story = await getStoryFromServer(
      "/logs/sectors/data_sediment_01/node_01/node_01.json"
    );
    return story;
  },
  // endregion
};
