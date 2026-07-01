import { getNodeById, getSectorById } from "@/domain/content/contentManifest";

export type StoryTarget = {
  sectorId: string;
  nodeId: string;
  storyPath: string;
};

const FIRST_NODE_ID = "node_00";

export function getNextStoryTarget(
  currentSector?: string,
  currentNode?: string,
): StoryTarget | null {
  if (!currentSector || !currentNode) {
    return null;
  }

  const nextNodeId = incrementId(currentNode);

  if (nextNodeId) {
    const nextNode = getNodeById(currentSector, nextNodeId);

    if (nextNode) {
      return {
        sectorId: currentSector,
        nodeId: nextNodeId,
        storyPath: nextNode.storyPath,
      };
    }
  }

  const nextSectorId = incrementId(currentSector);

  if (!nextSectorId) {
    return null;
  }

  const nextSector = getSectorById(nextSectorId);

  if (!nextSector) {
    return null;
  }

  const firstNode = getNodeById(nextSectorId, FIRST_NODE_ID);

  if (!firstNode) {
    return null;
  }

  return {
    sectorId: nextSectorId,
    nodeId: FIRST_NODE_ID,
    storyPath: firstNode.storyPath,
  };
}

export function hasNextStoryTarget(
  currentSector?: string,
  currentNode?: string,
): boolean {
  return Boolean(getNextStoryTarget(currentSector, currentNode));
}

function incrementId(id: string): string | null {
  const match = id.match(/^(.*?)(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, prefix, numberText] = match;
  const nextNumber = Number(numberText) + 1;

  if (nextNumber > 99) {
    return null;
  }

  return `${prefix}${String(nextNumber).padStart(2, "0")}`;
}
