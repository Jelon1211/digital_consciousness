import { EngineState, Phase } from "@/core/engine/EngineState";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { Command } from "@/types/Command";

export class HelpCommand implements Command {
  name = "help";

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute() {
    return true;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void
  ) {
    const story = await getStoryFromServer("/help.json");

    update({
      phase: Phase.MAIN,
      story,
    });
  }
}
