import { EngineState, Phase } from "@/domain/engine/EngineState";
import { BaseCommand } from "../BaseCommand";
import { ContentSector } from "@/domain/content/contentManifest";

export class SectorCommand extends BaseCommand {
  public readonly name: string;

  constructor(private sector: ContentSector) {
    super();
    this.name = sector.id.toLowerCase();
  }

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(state: EngineState) {
    return [Phase.SECTOR, Phase.NODE].includes(state.phase);
  }

  async execute(
    _state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const story = await this.getStoryFromServer(this.sector.storyPath);

    update({
      phase: Phase.SECTOR,
      currentSector: this.sector.id,
      currentNode: undefined,
      story: story ? await this.replaceStory(story, _state, input) : null,
    });
  }
}
