import { Commands } from "@/domain/engine/commands/commandNames";
import { Stories } from "@/domain/content/storyPaths";

export type ContentNode = {
  id: string;
  title: string;
  storyPath: string;
};

export type ContentSector = {
  id: string;
  title: string;
  storyPath: string;
  nodes: ContentNode[];
};

export type ArchiveNode = {
  command: Commands;
  title: string;
  sectorId: string;
  nodeId: string;
  storyPath: string;
};

export const contentManifest = {
  stories: {
    init: Stories.INIT,
    introduction: Stories.INTRODUCTION,
    logs: Stories.LOGS,
    sectors: Stories.SECTORS,
    help: Stories.HELP,
    error: Stories.ERROR,
  },
  archiveNodes: {
    history: {
      command: Commands.HISTORY,
      title: "Historia świata po Upadku",
      sectorId: "sector_00",
      nodeId: "node_00",
      storyPath: "/logs/sectors/sector_00/nodes/node_00.json",
    },
    map: {
      command: Commands.MAP,
      title: "Mapa sektorów głębi",
      sectorId: "sector_00",
      nodeId: "node_01",
      storyPath: "/logs/sectors/sector_00/nodes/node_01.json",
    },
  } satisfies Record<string, ArchiveNode>,
  sectors: [
    {
      id: "sector_01",
      title: "Osad Danych",
      storyPath: "/logs/sectors/sector_01/sector_01.json",
      nodes: [
        {
          id: "node_00",
          title: "Sekwencja wejścia",
          storyPath: "/logs/sectors/sector_01/nodes/node_00.json",
        },
        {
          id: "node_01",
          title: "Dźwięk z przeszłości",
          storyPath: "/logs/sectors/sector_01/nodes/node_01.json",
        },
      ],
    },
  ] satisfies ContentSector[],
} as const;

export const getSectorById = (sectorId?: string) =>
  contentManifest.sectors.find((sector) => sector.id === sectorId);

export const getNodeById = (sectorId?: string, nodeId?: string) =>
  getSectorById(sectorId)?.nodes.find((node) => node.id === nodeId) ??
  Object.values(contentManifest.archiveNodes).find(
    (node) => node.sectorId === sectorId && node.nodeId === nodeId
  );
