import { EngineState, Phase } from "@/core/engine/EngineState";
import { Stories } from "@/enums/Stories";
import { BaseCommand } from "../../BaseCommand";

export class NodeCommand extends BaseCommand {
  public readonly name: string;

  constructor(private sector: string, private node: string) {
    super();
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
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const path = `${Stories.BASE_SECTORS}/${this.sector}/nodes/${this.node}.json`;

    const story = await this.getStoryFromServer(path);

    update({
      phase: Phase.NODE,
      currentSector: this.sector,
      currentNode: this.node,
      story: story ? await this.replaceStory(story, _state, input) : null,
    });
  }
}
