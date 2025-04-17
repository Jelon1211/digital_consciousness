import { AppCommandContext } from "@/types/Command";
import { JsonInterface } from "@/types/JsonInterface";
import { CommandRegistry } from "./CommandRegistry";

export class CommandParser {
  constructor(
    private registry: CommandRegistry,
    private context: AppCommandContext
  ) {}

  async parse(input: string): Promise<{
    success: boolean;
    story: JsonInterface[] | null;
  }> {
    const [cmdName, ...args] = input.trim().split(" ");
    const command = this.registry.findMatching(cmdName);

    if (!command) {
      return {
        success: false,
        story: null,
      };
    }

    if (!command.canExecute(this.context)) {
      return {
        success: false,
        story: null,
      };
    }

    const story = await command.execute(args, this.context, cmdName);
    return { success: true, story };
  }

  getContext() {
    return this.context;
  }
}
