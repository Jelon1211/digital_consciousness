import { BackCommand } from "./commands/BackCommand";
import { HelpCommand } from "./commands/HelpCommand";
import { HistoryCommand } from "./commands/HistoryCommand";
import { LogsCommand } from "./commands/LogsCommand";
import { MapCommand } from "./commands/MapCommand";
import { NodeCommand } from "./commands/sectors/nodes/NodeCommand";
import { SectorCommand } from "./commands/sectors/SectorCommand";
import { SectorsCommand } from "./commands/SectorsCommand";
import { StartCommand } from "./commands/StartCommand";
import { contentManifest } from "@/domain/content/contentManifest";

const dynamicCommands = [
  ...contentManifest.sectors.map((sector) => new SectorCommand(sector)),
  ...contentManifest.sectors.flatMap((sector) =>
    sector.nodes.map((node) => new NodeCommand(sector, node))
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
