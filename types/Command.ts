import { JsonInterface } from "./JsonInterface";
import { AppContext } from "./AppContext";

export interface Command {
  name: string;
  matches: (input: string) => boolean;
  canExecute: (context: AppContext) => boolean;
  execute: () => Promise<JsonInterface[] | null>;
  help(): string;
}
