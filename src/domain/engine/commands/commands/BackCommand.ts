import { EngineState, Phase } from "@/domain/engine/EngineState";
import { Commands } from "@/domain/engine/commands/commandNames";
import { Stories } from "@/domain/content/storyPaths";
import { BaseCommand } from "./BaseCommand";

export class BackCommand extends BaseCommand {
  name = Commands.BACK;

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return state.phase === Phase.NODE;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const story = await this.getStoryFromServer(Stories.LOGS);

    update({
      phase: Phase.MAIN,
      currentSector: undefined,
      currentNode: undefined,
      story: story ? await this.replaceStory(story, _state, input) : null,
    });
  }
}
