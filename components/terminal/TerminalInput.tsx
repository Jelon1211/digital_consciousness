"use client";

import { useEffect, useRef, useState } from "react";
import { useTerminal } from "@/context/TerminalContext";
import { useEngineStore } from "@/store/useEngineStore";

export default function TerminalInput({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { setInputFocused } = useTerminal();
  const unitName = useEngineStore((state) => state.unitName);

  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };

    focusInput();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        focusInput();
      }
    };

    const handleWindowFocus = () => {
      focusInput();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  const handleBlur = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <span className="text-green-400">
        {unitName ? `${unitName}: ` : "Eris: "}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setInputFocused(false);
          handleBlur();
        }}
        onFocus={() => setInputFocused(true)}
        className="terminal bg-black text-green-400 border-none outline-none w-full"
      />
    </div>
  );
}
