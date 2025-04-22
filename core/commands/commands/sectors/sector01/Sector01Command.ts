import { EngineState, Phase } from "@/core/engine/EngineState";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { Command } from "@/types/Command";

export class Sector01Command implements Command {
  private readonly allowedPhases: Phase[] = [Phase.SECTOR, Phase.NODE];

  name = "sector_01";

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
    const story = await getStoryFromServer(
      "/logs/sectors/sector_01/sector_01.json"
    );

    update({
      phase: Phase.SECTOR,
      currentSector: this.name,
      story,
    });
  }
}
