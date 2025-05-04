import { EngineState, Phase } from "@/core/engine/EngineState";
import { Commands } from "@/enums/Commands";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { Command } from "@/types/Command";

export class LogsCommand implements Command {
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
    update: (partial: Partial<EngineState>) => void
  ) {
    const story = await getStoryFromServer("/logs/logs.json");

    update({
      phase: Phase.MAIN,
      story,
    });
  }
}
