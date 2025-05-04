import { EngineState, Phase } from "@/core/engine/EngineState";
import { Commands } from "@/enums/Commands";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { Command } from "@/types/Command";

export class SectorsCommand implements Command {
  private readonly allowedPhases: Phase[] = [Phase.MAIN, Phase.SECTOR];

  name = Commands.SECTORS;

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
    const story = await getStoryFromServer("/logs/sectors/sectors.json");

    update({
      phase: Phase.SECTOR,
      story,
    });
  }
}
