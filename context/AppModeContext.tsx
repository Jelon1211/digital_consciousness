"use client";

import { AppMode } from "@/enums/AppMode";
import { createContext, useContext, useState } from "react";

type AppModeContextType = {
  appMode: AppMode;
  currentChapter?: string;
  currentNode?: string;
  setAppMode: (mode: AppMode) => void;
  setCurrentChapter: (chapter: string) => void;
  setCurrentNode: (node: string) => void;
};

const AppModeContext = createContext<AppModeContextType>({
  appMode: AppMode.INIT,
  setAppMode: () => {},
  setCurrentChapter: () => {},
  setCurrentNode: () => {},
});

export const AppModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appMode, setAppMode] = useState(AppMode.INIT);
  const [currentChapter, setCurrentChapter] = useState<string | undefined>();
  const [currentNode, setCurrentNode] = useState<string | undefined>();

  console.log("app mode ->", appMode);

  return (
    <AppModeContext.Provider
      value={{
        appMode,
        setAppMode,
        currentChapter,
        currentNode,
        setCurrentChapter,
        setCurrentNode,
      }}
    >
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => useContext(AppModeContext);
