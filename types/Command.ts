import { JsonInterface } from "@/types/JsonInterface";
import { AppMode } from "@/enums/AppMode";

export interface AppCommandContext {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
}

export interface Command {
  name: string;
  matches: (input: string) => boolean;
  canExecute: (context: AppCommandContext) => boolean;
  execute: (
    args: string[],
    context: AppCommandContext,
    fullCommand: string
  ) => Promise<JsonInterface[] | null>;
  help: () => string;
}
