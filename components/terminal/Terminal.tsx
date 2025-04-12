"use client";

import { useEffect, useState } from "react";
import { JsonInterface } from "@/types/JsonInterface";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";
import { commandMap } from "@/lib/commandMap";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";

export default function Terminal({
  story: initialStory,
}: {
  story: JsonInterface[];
}) {
  const [story, setStory] = useState<JsonInterface[]>(initialStory);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [storyKey, setStoryKey] = useState<number>(0);

  useEffect(() => {
    if (!story || story.length === 0) return;

    setVisibleLines(0);
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
  }, [storyKey]);

  const handleCommand = async (input: string) => {
    const command = input.trim().toLowerCase();
    const commandAction = commandMap[command];

    if (commandAction) {
      localStorage.setItem("lastCommand", command);
      const newStory = await commandAction();
      if (newStory) {
        setStory(newStory);
        setStoryKey((prev) => prev + 1);
      }
      return;
    }

    const errorStory = await getStoryFromServer("/error.json");

    if (errorStory) {
      const parsedErrorStory = errorStory.map((item) => ({
        ...item,
        text: item.text.replace("<command>", input),
      }));

      setStory(parsedErrorStory);
      setStoryKey((prev) => prev + 1);
    }
  };

  return (
    <div
      className="terminal invisible-scrollbar bg-black text-green-500 p-4 rounded-xl shadow-lg max-w-xl mx-auto mt-10 w-full h-64 overflow-auto"
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

        {(visibleLines === story.length || story.length === 0) && (
          <TerminalInput onSubmit={handleCommand} />
        )}
      </div>
    </div>
  );
}
