import { AppMode } from "@/enums/AppMode";

export interface LastSession {
  command: string;
  appMode: AppMode;
  currentChapter?: string;
  currentNode?: string;
}
