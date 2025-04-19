import { Command } from "@/types/Command";
import { AppContext } from "@/types/AppContext";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { AppMode } from "@/enums/AppMode";
import { eventBus } from "@/lib/events/EventBus";

export class LogsCommand implements Command {
  name = "logs";

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(context: AppContext) {
    return context.appMode === AppMode.TERMINAL;
  }

  async execute() {
    eventBus.emit("mode:change", { mode: AppMode.TERMINAL });
    return await getStoryFromServer("/logs/logs.json");
  }

  help() {
    return "start – rozpocznij historię";
  }
}
