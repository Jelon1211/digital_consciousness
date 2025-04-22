import { Command } from "@/types/Command";

export class CommandRegistry {
  private commands: Command[] = [];

  register(command: Command) {
    this.commands.push(command);
  }

  findMatching(input: string): Command | undefined {
    return this.commands.find((c) => c.matches(input));
  }
}
