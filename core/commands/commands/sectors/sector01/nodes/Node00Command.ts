import { EngineState, Phase } from "@/core/engine/EngineState";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { Command } from "@/types/Command";

export class Node00Command implements Command {
  private readonly sector = "sector_01";
  name = "node_00";

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return state.phase === Phase.SECTOR;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void
  ) {
    const story = await getStoryFromServer(
      "/logs/sectors/sector_01/nodes/node_00.json"
    );

    update({
      phase: Phase.NODE,
      currentSector: this.sector,
      currentNode: this.name,
      story,
    });
  }
}
