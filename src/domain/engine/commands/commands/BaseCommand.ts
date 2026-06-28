import { EngineState } from "@/domain/engine/EngineState";
import {
  replacePlaceholderObject,
  replacePlaceholders,
} from "@/domain/content/placeholder";
import { Command } from "@/domain/engine/command.types";
import { JsonInterface } from "@/domain/content/story.types";
import { getStory } from "@/domain/content/actions/getStory";

export abstract class BaseCommand implements Command {
  abstract name: string;
  abstract matches(input: string, state?: EngineState): boolean;
  abstract canExecute(state: EngineState): boolean;
  abstract execute(
    state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ): Promise<void>;

  protected async replaceStory(
    story: JsonInterface[],
    state: EngineState,
    input: string
  ): Promise<JsonInterface[]> {
    return replacePlaceholders(
      story,
      replacePlaceholderObject(input, state.unitName)
    );
  }

  protected async getStoryFromServer(
    path: string
  ): Promise<JsonInterface[] | null> {
    return await getStory(path);
  }
}
