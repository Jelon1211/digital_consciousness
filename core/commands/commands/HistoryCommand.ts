import { EngineState, Phase } from "@/core/engine/EngineState";
import { Commands } from "@/enums/Commands";
import { Command } from "@/types/Command";

export class HistoryCommand implements Command {
  name = Commands.HISTORY;

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
      currentNode: "node_00",
      phase: Phase.NODE,
      story: null,
    });
  }
}
