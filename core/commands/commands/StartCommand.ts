import { EngineState, Phase } from "@/core/engine/EngineState";
import { Commands } from "@/enums/Commands";
import { BaseCommand } from "./BaseCommand";
import { Stories } from "@/enums/Stories";

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
    _state.unitName = trimmedName;

    update({
      unitName: trimmedName,
      phase: Phase.MAIN,
      story: story ? await this.replaceStory(story, _state, trimmedName) : null,
    });
  }
}
