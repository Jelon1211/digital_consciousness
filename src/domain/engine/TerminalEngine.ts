import { useEngineStore } from "@/domain/engine/engine.store";
import { CommandRegistry } from "./commands/CommandRegistry";
import { EngineState, Phase } from "./EngineState";
import { getStory } from "@/domain/content/actions/getStory";
import {
  replacePlaceholderObject,
  replacePlaceholders,
} from "@/domain/content/placeholder";
import { Commands } from "@/domain/engine/commands/commandNames";
import { contentManifest } from "@/domain/content/contentManifest";

export class Engine {
  constructor(private registry: CommandRegistry) {}

  get state(): EngineState {
    return useEngineStore.getState();
  }

  update = (partial: Partial<EngineState>) => {
    useEngineStore.setState(partial);
  };

  async run(input: string) {
    let command = this.registry.findMatching(input.trim(), this.state);

    if (this.state.phase === Phase.INIT) {
      command = this.registry.getCommandByName(Commands.START);
    }

    if (!command) {
      this.update({ currentCommand: input });

      const errorStory = await getStory(contentManifest.stories.error);

      if (errorStory) {
        const replacedStory = replacePlaceholders(
          errorStory,
          replacePlaceholderObject(input)
        );
        this.update({ story: replacedStory });
      }

      return;
    }

    this.update({ currentCommand: command.name });

    await command.execute(this.state, this.update, input);
  }
}
