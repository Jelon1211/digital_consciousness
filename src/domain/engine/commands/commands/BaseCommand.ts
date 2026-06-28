import { EngineState } from "@/domain/engine/EngineState";
import {
  replacePlaceholderObject,
  replacePlaceholders,
} from "@/domain/content/placeholder";
import { Command } from "@/domain/engine/command.types";
import { PreparedStoryI } from "@/domain/content/story.types";
import { getStory } from "@/domain/content/actions/getStory";

export abstract class BaseCommand implements Command {
  abstract name: string;
  abstract matches(input: string, state?: EngineState): boolean;
  abstract canExecute(state: EngineState): boolean;
  abstract execute(
    state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string,
  ): Promise<void>;

  protected async replaceStory(
    story: PreparedStoryI[],
    state: EngineState,
    input: string,
  ): Promise<PreparedStoryI[]> {
    return replacePlaceholders(
      story,
      replacePlaceholderObject(input, state.unitName),
    );
  }

  protected async getStoryFromServer(
    path: string,
  ): Promise<PreparedStoryI[] | null> {
    return await getStory(path);
  }
}
