import { EngineState, Phase } from "@/core/engine/EngineState";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { Command } from "@/types/Command";

export class SectorCommand implements Command {
  public readonly name: string;

  constructor(private sector: string) {
    this.name = sector.toLowerCase();
  }

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return [Phase.SECTOR, Phase.NODE].includes(state.phase);
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void
  ) {
    const path = `/logs/sectors/${this.sector}/${this.sector}.json`;
    const story = await getStoryFromServer(path);

    update({
      phase: Phase.SECTOR,
      currentSector: this.sector,
      story,
    });
  }
}
