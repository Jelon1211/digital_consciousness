import { EngineState, Phase } from "@/core/engine/EngineState";
import { Commands } from "@/enums/Commands";
import { Stories } from "@/enums/Stories";
import { getStory } from "@/lib/actions/getStory";
import { Command } from "@/types/Command";

export class HelpCommand implements Command {
  name = Commands.HELP;

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
    const story = await getStory(Stories.HELP);

    update({
      phase: Phase.MAIN,
      story,
    });
  }
}
