import { EngineState, Phase } from "@/domain/engine/EngineState";
import { PreparedStoryI } from "@/domain/content/story.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialEngineState: EngineState = {
  phase: Phase.INIT,
  unitName: "",
  currentCommand: "",
  currentSector: undefined,
  currentNode: undefined,
  story: undefined,
  isEntered: false,
};

export interface EngineStore extends EngineState {
  setPhase: (phase: Phase) => void;
  setCommand: (command: string) => void;
  setSector: (sector: string) => void;
  setNode: (node: string) => void;
  setStory: (story: PreparedStoryI[]) => void;
  setIsEntered: (isEntered: boolean) => void;

  resetEngine: () => void;
}

export const useEngineStore = create<EngineStore>()(
  persist(
    (set) => ({
      ...initialEngineState,

      setPhase: (phase) => set({ phase }),
      setCommand: (command) => set({ currentCommand: command }),
      setSector: (sector) => set({ currentSector: sector }),
      setNode: (node) => set({ currentNode: node }),
      setStory: (story) => set({ story }),
      setIsEntered: (isEntered) => set({ isEntered }),

      resetEngine: () => set({ ...initialEngineState }),
    }),
    {
      name: "terminal-engine-store",
      partialize: (state) => ({
        phase: state.phase,
        unitName: state.unitName,
        currentCommand: state.currentCommand,
        currentSector: state.currentSector,
        currentNode: state.currentNode,
        story: state.story,
        isEntered: state.isEntered,
      }),
    },
  ),
);
