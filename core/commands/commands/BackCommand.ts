import { EngineState, Phase } from "@/core/engine/EngineState";
import { Commands } from "@/enums/Commands";
import { getStory } from "@/lib/actions/getStory";
import { Command } from "@/types/Command";

export class BackCommand implements Command {
  name = Commands.BACK;

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return state.phase === Phase.NODE;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void
  ) {
    const story = await getStory("/logs/sectors/sectors.json");

    update({
      phase: Phase.SECTOR,
      story,
    });
  }
}
