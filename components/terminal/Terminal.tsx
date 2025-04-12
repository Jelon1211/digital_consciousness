"use client";

import { useEffect, useState } from "react";
import { JsonInterface } from "@/types/JsonInterface";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";

export default function Terminal({ story }: { story: JsonInterface[] }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const lastVisibleItem = story[visibleLines - 1];
  const shouldShowInput = lastVisibleItem?.showInput;

  useEffect(() => {
    if (!story || story.length === 0) return;

    let totalTime = 0;

    const timeouts = story.map((item) => {
      totalTime += item.delay;

      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, totalTime);

      totalTime += item.duration;
      return timer;
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [story]);

  const handleSubmit = async (input: string) => {
    console.log(input);
  };

  return (
    <div
      className="terminal-container bg-black text-green-500 p-4 rounded-xl shadow-lg max-w-xl mx-auto mt-10 w-full h-64 overflow-auto"
      style={{
        fontFamily: "var(--font-vcr)",
      }}
    >
      <div className="flex flex-col">
        {story.slice(0, visibleLines).map((item, index) => (
          <TerminalLine
            key={item.id ?? index}
            item={item}
            isLast={index === visibleLines - 1}
          />
        ))}

        {shouldShowInput && (
          <TerminalInput
            onSubmit={(value) => {
              handleSubmit(value);
            }}
          />
        )}
      </div>
    </div>
  );
}
