import { EngineState, Phase } from "@/domain/engine/EngineState";
import { Commands } from "@/domain/engine/commands/commandNames";
import { BaseCommand } from "./BaseCommand";
import { Stories } from "@/domain/content/storyPaths";

export class StartCommand extends BaseCommand {
  name = Commands.START;

  matches() {
    return false;
  }

  canExecute(state: EngineState) {
    return state.phase === Phase.INIT;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const trimmedName = input.trim();
    const story = await this.getStoryFromServer(Stories.INTRODUCTION);
    const nextState = { ..._state, unitName: trimmedName };

    update({
      unitName: trimmedName,
      phase: Phase.MAIN,
      story: story ? await this.replaceStory(story, nextState, trimmedName) : null,
    });
  }
}
