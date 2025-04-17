import { AppMode } from "@/enums/AppMode";

export interface AppModeContext {
  mode: AppMode;
  currentChapter?: string;
  currentNode?: string;
}
