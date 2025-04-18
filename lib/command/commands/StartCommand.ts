import { Command } from "@/types/Command";
import { AppContext } from "@/types/AppContext";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { AppMode } from "@/enums/AppMode";
import { eventBus } from "@/lib/events/EventBus";

export class StartCommand implements Command {
  name = "start";

  matches(input: string) {
    return input.trim().toLowerCase() === this.name;
  }

  canExecute(context: AppContext) {
    return context.appMode === AppMode.INIT;
  }

  async execute() {
    eventBus.emit("mode:change", { mode: AppMode.TERMINAL });
    return await getStoryFromServer("/introduction.json");
  }

  help() {
    return "start – rozpocznij historię";
  }
}
