"use client";

import { createContext, useContext, useState } from "react";

type StoryContextType = {
  isStory: boolean;
  setIsStory: (isStory: boolean) => void;
};

const StoryContext = createContext<StoryContextType>({
  isStory: false,
  setIsStory: () => {},
});

export const StoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [isStory, setIsStory] = useState(false);

  return (
    <StoryContext.Provider value={{ isStory, setIsStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => useContext(StoryContext);
