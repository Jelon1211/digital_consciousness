import { useEngineStore } from "@/store/useEngineStore";
import { CommandRegistry } from "../commands/CommandRegistry";
import { EngineState } from "./EngineState";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { replaceCommand } from "@/lib/utils/replaceCommand";

export class Engine {
  constructor(private registry: CommandRegistry) {}

  get state(): EngineState {
    return useEngineStore.getState();
  }

  update = (partial: Partial<EngineState>) => {
    useEngineStore.setState(partial);
  };

  async run(input: string) {
    const command = this.registry.findMatching(input.trim());
    if (!command) {
      this.update({ currentCommand: input });

      const errorStory = await getStoryFromServer("/error.json");

      if (errorStory) {
        const replacedStory = replaceCommand(errorStory, input);
        this.update({ story: replacedStory });
      }

      return;
    }

    if (!command.canExecute(this.state)) {
      return;
    }

    this.update({ currentCommand: command.name });

    await command.execute(this.state, this.update);
  }
}
