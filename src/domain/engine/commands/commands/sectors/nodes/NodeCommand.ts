import { EngineState, Phase } from "@/domain/engine/EngineState";
import { ContentNode, ContentSector } from "@/domain/content/contentManifest";
import { BaseCommand } from "../../BaseCommand";

export class NodeCommand extends BaseCommand {
  public readonly name: string;

  constructor(
    private sector: ContentSector,
    private node: ContentNode
  ) {
    super();
    this.name = node.id.toLowerCase();
  }

  matches(input: string, state?: EngineState) {
    return (
      input.trim().toLowerCase() === this.name &&
      state?.currentSector === this.sector.id
    );
  }

  canExecute(state: EngineState) {
    return state.phase === Phase.SECTOR;
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const story = await this.getStoryFromServer(this.node.storyPath);

    update({
      phase: Phase.NODE,
      currentSector: this.sector.id,
      currentNode: this.node.id,
      story: story ? await this.replaceStory(story, _state, input) : null,
    });
  }
}
