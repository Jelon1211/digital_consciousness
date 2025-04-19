import { AppMode } from "@/enums/AppMode";

export interface AppContext {
  appMode: AppMode;
  currentChapter?: string;
  currentNode?: string;
  lastCommand?: string;
}

export type AppModeContextType = {
  appMode: AppMode;
  currentChapter?: string;
  currentNode?: string;
  setAppMode: (mode: AppMode) => void;
  setCurrentChapter: (chapter: string) => void;
  setCurrentNode: (node: string) => void;
};
