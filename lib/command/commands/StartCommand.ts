import { AppMode } from "@/enums/AppMode";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { AppCommandContext, Command } from "@/types/Command";
import { JsonInterface } from "@/types/JsonInterface";

export class StartCommand implements Command {
  name = "start";

  matches(input: string): boolean {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(context: AppCommandContext): boolean {
    return context.appMode === AppMode.INIT;
  }

  async execute(
    args: string[],
    context: AppCommandContext
  ): Promise<JsonInterface[] | null> {
    context.setAppMode(AppMode.TERMINAL);
    return await getStoryFromServer("/introduction.json");
  }

  help(): string {
    return "start - rozpocznij historię.";
  }
}
