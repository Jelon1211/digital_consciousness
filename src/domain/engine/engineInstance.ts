import { allCommands } from "@/domain/engine/commands/allCommands";
import { CommandRegistry } from "@/domain/engine/commands/CommandRegistry";
import { Engine } from "@/domain/engine/TerminalEngine";

const registry = new CommandRegistry();
allCommands.forEach((command) => registry.register(command));

export const engine = new Engine(registry);
