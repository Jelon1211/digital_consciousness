import { eventBus } from "../events/EventBus";
import { CommandRegistry } from "./CommandRegistry";
import { AppContext } from "@/types/AppContext";

export class CommandParser {
  constructor(private registry: CommandRegistry, private context: AppContext) {}

  async parse(input: string) {
    const command = this.registry.findMatching(input);
    if (!command) return;

    if (!command.canExecute(this.context)) return;

    const story = await command.execute();
    eventBus.emit("command:executed", { input });

    if (story) {
      eventBus.emit("story:loaded", { story });
    }
  }
}
