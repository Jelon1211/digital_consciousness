import { SetStateAction } from "react";
import { Command } from "./Command";
import { JsonInterface } from "./JsonInterface";
import { AppMode } from "@/enums/AppMode";

export type AppEventMap = {
  "command:error": { input: string; error: Error };
  "command:executed": { input: string };
  "mode:change": { mode: AppMode };
  "story:loaded": { story: SetStateAction<JsonInterface[]> };
  "command:not-found": { input: string };
  "command:invalid-context": { command: Command };
};

export type EventName = keyof AppEventMap;
export type Listener<T> = (payload: T) => void;
