import { Commands } from "@/domain/engine/commands/commandNames";
import { Command } from "@/domain/engine/command.types";
import { EngineState } from "@/domain/engine/EngineState";

export class CommandRegistry {
  private commands: Command[] = [];

  register(command: Command) {
    this.commands.push(command);
  }

  findMatching(input: string, state: EngineState): Command | undefined {
    return this.commands.find((command) => {
      return command.matches(input, state) && command.canExecute(state);
    });
  }

  getCommandByName(name: Commands): Command | undefined {
    return this.commands.find((command) => command.name === name);
  }
}
