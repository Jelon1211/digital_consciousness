import { EngineState } from "@/core/engine/EngineState";

export interface Command {
  name: string;
  matches: (input: string) => boolean;
  canExecute: (state: EngineState) => boolean;
  execute: (
    state: EngineState,
    update: (partial: Partial<EngineState>) => void
  ) => Promise<void>;
}
