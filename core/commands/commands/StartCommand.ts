import { EngineState, Phase } from "@/core/engine/EngineState";
import { Commands } from "@/enums/Commands";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { Command } from "@/types/Command";

export class StartCommand implements Command {
  name = Commands.START;

  matches() {
    return true;
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
    const story = await getStoryFromServer("/introduction.json");

    update({
      unitName: trimmedName,
      phase: Phase.MAIN,
      story,
    });
  }
}
