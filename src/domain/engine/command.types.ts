import { EngineState } from "@/domain/engine/EngineState";

export interface Command {
  name: string;
  matches: (input: string, state?: EngineState) => boolean;
  canExecute: (state: EngineState) => boolean;
  execute: (
    state: EngineState,
    update: (partial: Partial<EngineState>) => void,
    input: string
  ) => Promise<void>;
}
