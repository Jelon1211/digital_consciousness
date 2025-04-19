"use client";
import { createContext, useContext, useState } from "react";
import { AppContext } from "@/types/AppContext";
import { AppMode } from "@/enums/AppMode";

type ContextType = AppContext & {
  setAppMode: (mode: AppMode) => void;
  setCurrentChapter: (chapter: string) => void;
  setCurrentNode: (node: string) => void;
};

const AppCtx = createContext<ContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appMode, setAppMode] = useState(AppMode.INIT);
  const [currentChapter, setCurrentChapter] = useState<string>();
  const [currentNode, setCurrentNode] = useState<string>();

  return (
    <AppCtx.Provider
      value={{
        appMode,
        currentChapter,
        currentNode,
        setAppMode,
        setCurrentChapter,
        setCurrentNode,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};
