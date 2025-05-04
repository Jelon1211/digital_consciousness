import { JsonInterface } from "@/types/JsonInterface";

export enum Phase {
  INIT = "init",
  MAIN = "main",
  SECTOR = "sector",
  NODE = "node",
}

export interface EngineState {
  phase: Phase;
  unitName: string;
  currentCommand: string;
  currentSector?: string;
  currentNode?: string;
  story?: JsonInterface[] | null;
}
