import { EngineState, Phase } from "@/core/engine/EngineState";
import { BaseCommand } from "../BaseCommand";
import { Stories } from "@/enums/Stories";

export class SectorCommand extends BaseCommand {
  public readonly name: string;

  constructor(private sector: string) {
    super();
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
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) {
    const path = `${Stories.BASE_SECTORS}/${this.sector}/${this.sector}.json`;
    const story = await this.getStoryFromServer(path);

    update({
      phase: Phase.SECTOR,
      currentSector: this.sector,
      story: story ? await this.replaceStory(story, _state, input) : null,
    });
  }
}
