import { useEngineStore } from "@/store/useEngineStore";
import { CommandRegistry } from "../commands/CommandRegistry";
import { EngineState, Phase } from "./EngineState";
import { getStory } from "@/lib/actions/getStory";
import {
  replacePlaceholderObject,
  replacePlaceholders,
} from "@/lib/utils/replaceInputs";
import { Commands } from "@/enums/Commands";

export class Engine {
  constructor(private registry: CommandRegistry) {}

  get state(): EngineState {
    return useEngineStore.getState();
  }

  update = (partial: Partial<EngineState>) => {
    useEngineStore.setState(partial);
  };

  async run(input: string) {
    let command = this.registry.findMatching(input.trim());

    if (this.state.phase === Phase.INIT) {
      command = this.registry.getCommandByName(Commands.START);
    }

    if (!command) {
      this.update({ currentCommand: input });

      const errorStory = await getStory("/error.json");

      if (errorStory) {
        const replacedStory = replacePlaceholders(
          errorStory,
          replacePlaceholderObject(input)
        );
        this.update({ story: replacedStory });
      }

      return;
    }

    if (!command.canExecute(this.state)) {
      return;
    }

    this.update({ currentCommand: command.name });

    await command.execute(this.state, this.update, input);
  }
}
