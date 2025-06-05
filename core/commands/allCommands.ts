import { BackCommand } from "./commands/BackCommand";
import { HelpCommand } from "./commands/HelpCommand";
import { HistoryCommand } from "./commands/HistoryCommand";
import { LogsCommand } from "./commands/LogsCommand";
import { MapCommand } from "./commands/MapCommand";
import { NodeCommand } from "./commands/sectors/nodes/NodeCommand";
import { SectorCommand } from "./commands/sectors/SectorCommand";
import { SectorsCommand } from "./commands/SectorsCommand";
import { StartCommand } from "./commands/StartCommand";

const sectorConfig = {
  sector_01: ["node_00", "node_01"],
};

const dynamicCommands = [
  ...Object.keys(sectorConfig).map((sector) => new SectorCommand(sector)),
  ...Object.entries(sectorConfig).flatMap(([sector, nodes]) =>
    nodes.map((node) => new NodeCommand(sector, node))
  ),
];

export const allCommands = [
  new StartCommand(),
  new LogsCommand(),
  new SectorsCommand(),
  new HelpCommand(),
  new BackCommand(),
  new HistoryCommand(),
  new MapCommand(),
  ...dynamicCommands,
];
