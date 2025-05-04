import { EngineState } from "@/core/engine/EngineState";
import {
  replacePlaceholderObject,
  replacePlaceholders,
} from "@/lib/utils/replaceInputs";
import { Command } from "@/types/Command";
import { JsonInterface } from "@/types/JsonInterface";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";

export abstract class BaseCommand implements Command {
  abstract name: string;
  abstract matches(input: string): boolean;
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
    return await getStoryFromServer(path);
  }
}
