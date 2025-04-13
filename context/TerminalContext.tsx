"use client";

import { createContext, useContext, useState } from "react";

type TerminalContextType = {
  inputFocused: boolean;
  setInputFocused: (focused: boolean) => void;
};

const TerminalContext = createContext<TerminalContextType>({
  inputFocused: false,
  setInputFocused: () => {},
});

export const TerminalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <TerminalContext.Provider value={{ inputFocused, setInputFocused }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => useContext(TerminalContext);
