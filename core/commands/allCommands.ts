import { HelpCommand } from "./commands/HelpCommand";
import { LogsCommand } from "./commands/LogsCommand";
import { Node00Command } from "./commands/sectors/sector01/nodes/Node00Command";
import { Node01Command } from "./commands/sectors/sector01/nodes/Node01Command";
import { Sector01Command } from "./commands/sectors/sector01/Sector01Command";
import { SectorsCommand } from "./commands/SectorsCommand";
import { StartCommand } from "./commands/StartCommand";

export const allCommands = [
  new StartCommand(),
  new LogsCommand(),
  new SectorsCommand(),
  new Sector01Command(),
  new Node00Command(),
  new Node01Command(),
  new HelpCommand(),
];
