"use client";

import { useEffect, useState } from "react";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";
import { JsonInterface } from "@/types/JsonInterface";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";

export default function Terminal() {
  const [story, setStory] = useState<JsonInterface[] | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [storyKey, setStoryKey] = useState(0);

  useEffect(() => {
    if (!story || story.length === 0) return;

    setVisibleLines(0);
    let totalTime = 0;

    const timers = story.map((item) => {
      totalTime += item.delay ?? 0;
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, totalTime);
      totalTime += item.duration ?? 0;
      return timeout;
    });

    return () => timers.forEach(clearTimeout);
  }, [story, storyKey]);

  const handleCommand = async (input: string) => {};

  const handleInit = async () => {
    const storyInit = await getStoryFromServer("/init.json");
    setStory(storyInit);
  };

  if (!Array.isArray(story) || story.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <button
          className="teaser-component teaser-btn crt-text"
          onClick={handleInit}
        >
          ENTER
        </button>
      </div>
    );
  }

  return (
    <div className="terminal bg-black text-green-500 p-4 rounded-xl shadow max-w-xl mx-auto mt-10 w-full h-64 overflow-auto">
      <div className="flex flex-col">
        {story.slice(0, visibleLines).map((item, index) => (
          <TerminalLine
            key={item.id ?? index}
            item={item}
            isLast={index === visibleLines - 1}
          />
        ))}
        {visibleLines === story.length && (
          <TerminalInput onSubmit={handleCommand} />
        )}
      </div>
    </div>
  );
}
