import { EngineState, Phase } from "@/core/engine/EngineState";
import { Command } from "@/types/Command";

export class MapCommand implements Command {
  name = "map";

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return state.phase === Phase.MAIN;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void
  ) {
    update({
      currentSector: "sector_00",
      currentNode: "node_01",
      phase: Phase.NODE,
      story: null,
    });
  }
}
