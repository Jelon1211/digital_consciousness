import { allCommands } from "@/core/commands/allCommands";
import { CommandRegistry } from "@/core/commands/CommandRegistry";
import { Engine } from "@/core/engine/TerminalEngine";

const registry = new CommandRegistry();
allCommands.forEach((command) => registry.register(command));

export const engine = new Engine(registry);
