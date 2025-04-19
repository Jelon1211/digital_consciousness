"use client";

import { useEffect, useState } from "react";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";
import { JsonInterface } from "@/types/JsonInterface";
import { useEvent } from "@/hooks/useEvent";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { SessionStorage } from "@/lib/utils/SessionStorage";
import { useAppContext } from "@/context/AppContext";
import { CommandParser } from "@/lib/command/CommandParser";

type TerminalProps = {
  story: JsonInterface[];
  parserRef: React.RefObject<CommandParser | null>;
};

export default function Terminal({
  story: initialStory,
  parserRef,
}: TerminalProps) {
  const [story, setStory] = useState<JsonInterface[]>(initialStory);
  const [visibleLines, setVisibleLines] = useState(0);
  const [storyKey, setStoryKey] = useState(0);

  const { appMode, currentChapter, currentNode } = useAppContext();

  useEvent("story:loaded", ({ story }) => {
    setStory(story);
    setStoryKey((prev) => prev + 1);
  });

  useEvent("command:not-found", async ({ input }) => {
    const fallback = await getStoryFromServer("/error.json");
    if (fallback) {
      const modified = fallback.map((item) => ({
        ...item,
        text: item.text.replace("<command>", input),
      }));
      setStory(modified);
      setStoryKey((prev) => prev + 1);
    }
  });

  useEvent("command:executed", ({ input }) => {
    SessionStorage.saveLastSession({
      lastCommand: input,
      appMode,
      currentChapter,
      currentNode,
    });
  });

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

  const handleCommand = async (input: string) => {
    await parserRef.current?.parse(input);
  };

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
        {(visibleLines === story.length || story.length === 0) && (
          <TerminalInput onSubmit={handleCommand} />
        )}
      </div>
    </div>
  );
}
