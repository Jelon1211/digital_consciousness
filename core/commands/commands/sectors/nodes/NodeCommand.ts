import { EngineState, Phase } from "@/core/engine/EngineState";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { Command } from "@/types/Command";

export class NodeCommand implements Command {
  public readonly name: string;

  constructor(private sector: string, private node: string) {
    this.name = node.toLowerCase();
  }

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
    const path = `/logs/sectors/${this.sector}/nodes/${this.node}.json`;
    const story = await getStoryFromServer(path);

    update({
      phase: Phase.NODE,
      currentSector: this.sector,
      currentNode: this.node,
      story,
    });
  }
}
