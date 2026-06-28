import { EngineState, Phase } from "@/domain/engine/EngineState";
import { Commands } from "@/domain/engine/commands/commandNames";
import { contentManifest } from "@/domain/content/contentManifest";
import { BaseCommand } from "./BaseCommand";

export class HistoryCommand extends BaseCommand {
  name = Commands.HISTORY;

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return state.phase === Phase.MAIN;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const node = contentManifest.archiveNodes.history;
    const story = await this.getStoryFromServer(node.storyPath);

    update({
      currentSector: node.sectorId,
      currentNode: node.nodeId,
      phase: Phase.NODE,
      story: story ? await this.replaceStory(story, _state, input) : null,
    });
  }
}
