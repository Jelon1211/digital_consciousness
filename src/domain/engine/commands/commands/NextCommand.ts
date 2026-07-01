import { EngineState, Phase } from "@/domain/engine/EngineState";
import { Commands } from "@/domain/engine/commands/commandNames";
import { BaseCommand } from "./BaseCommand";
import { getNextStory } from "@/domain/content/actions/getNextStory";

export class NextCommand extends BaseCommand {
  name = Commands.NEXT;

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return state.phase === Phase.NODE;
  }

  async execute(
    state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string,
  ) {
    const next = await getNextStory(state.currentSector, state.currentNode);

    if (!next) {
      return;
    }

    update({
      phase: Phase.NODE,
      currentSector: next.sectorId,
      currentNode: next.nodeId,
      story: next.story
        ? await this.replaceStory(next.story, state, input)
        : null,
    });
  }
}
