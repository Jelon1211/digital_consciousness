"use client";

import { useEffect, useRef, useState } from "react";

export default function TerminalInput({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <span className="text-green-400">Eris: </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-black text-green-400 border-none outline-none w-full animate-cursor"
        style={{
          fontFamily: "var(--font-vcr)",
        }}
      />
    </div>
  );
}
