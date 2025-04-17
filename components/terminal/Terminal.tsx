"use client";

import { useEffect, useRef, useState } from "react";
import { JsonInterface } from "@/types/JsonInterface";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { useAppMode } from "@/context/AppModeContext";
import { CommandRegistry } from "@/lib/command/CommandRegistry";
import { CommandParser } from "@/lib/command/CommandParser";
import { StartCommand } from "@/lib/command/commands/StartCommand";
import { saveLastSession } from "@/lib/utils/sessionStoraage";
import { AppMode } from "@/enums/AppMode";

export default function Terminal({
  story: initialStory,
}: {
  story: JsonInterface[];
}) {
  const [story, setStory] = useState<JsonInterface[]>(initialStory);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [storyKey, setStoryKey] = useState<number>(0);

  const { appMode, setAppMode, currentChapter, currentNode } = useAppMode();
  const registryRef = useRef<CommandRegistry>(new CommandRegistry());
  const parserRef = useRef<CommandParser | null>(null);

  useEffect(() => {
    const registry = registryRef.current;

    registry.register(new StartCommand());

    parserRef.current = new CommandParser(registry, {
      appMode,
      setAppMode,
    });
  }, [appMode, setAppMode]);

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
  }, [story, storyKey]);

  const handleCommand = async (input: string) => {
    console.log(appMode);

    const parser = parserRef.current;
    if (!parser) return;

    const result = await parser.parse(input);

    if (result.success && result.story) {
      setStory(result.story);
      setStoryKey((prev) => prev + 1);
      saveLastSession({
        command: input,
        appMode: parserRef.current?.getContext().appMode ?? AppMode.INIT,
        currentChapter,
        currentNode,
      });
    } else {
      const errorStory = await getStoryFromServer("/error.json");
      if (errorStory) {
        const parsedErrorStory = errorStory.map((item) => ({
          ...item,
          text: item.text.replace("<command>", input),
        }));
        setStory(parsedErrorStory);
        setStoryKey((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="terminal invisible-scrollbar bg-black text-green-500 p-4 rounded-xl shadow-lg max-w-xl mx-auto mt-10 w-full h-64 overflow-auto">
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
