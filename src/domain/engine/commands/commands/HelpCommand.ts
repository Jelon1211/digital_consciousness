import { EngineState, Phase } from "@/domain/engine/EngineState";
import { Commands } from "@/domain/engine/commands/commandNames";
import { Stories } from "@/domain/content/storyPaths";
import { BaseCommand } from "./BaseCommand";

export class HelpCommand extends BaseCommand {
  name = Commands.HELP;

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute() {
    return true;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const story = await this.getStoryFromServer(Stories.HELP);

    update({
      phase: Phase.MAIN,
      story: story ? await this.replaceStory(story, _state, input) : null,
    });
  }
}
