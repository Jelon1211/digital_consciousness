import { EngineState, Phase } from "@/core/engine/EngineState";
import { JsonInterface } from "@/types/JsonInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EngineStore extends EngineState {
  setPhase: (phase: Phase) => void;
  setCommand: (command: string) => void;
  setSector: (sector: string) => void;
  setNode: (node: string) => void;
  setStory: (story: JsonInterface[]) => void;
}

export const useEngineStore = create<EngineStore>()(
  persist(
    (set) => ({
      phase: Phase.INIT,
      currentCommand: "",
      currentSector: undefined,
      currentNode: undefined,
      story: undefined,

      setPhase: (phase) => set({ phase }),
      setCommand: (command) => set({ currentCommand: command }),
      setSector: (sector) => set({ currentSector: sector }),
      setNode: (node) => set({ currentNode: node }),
      setStory: (story) => set({ story }),
    }),
    {
      name: "terminal-engine-store",
      partialize: (state) => ({
        phase: state.phase,
        currentCommand: state.currentCommand,
        currentSector: state.currentSector,
        currentNode: state.currentNode,
        story: state.story,
      }),
    }
  )
);
