import { EngineState, Phase } from "@/domain/engine/EngineState";
import { Commands } from "@/domain/engine/commands/commandNames";
import { BaseCommand } from "./BaseCommand";
import { Stories } from "@/domain/content/storyPaths";

export class LogsCommand extends BaseCommand {
  private readonly allowedPhases: Phase[] = [Phase.MAIN, Phase.SECTOR];

  name = Commands.LOGS;

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return this.allowedPhases.includes(state.phase);
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const story = await this.getStoryFromServer(Stories.LOGS);

    update({
      phase: Phase.MAIN,
      story: story ? await this.replaceStory(story, _state, input) : null,
    });
  }
}
