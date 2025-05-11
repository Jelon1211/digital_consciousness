"use client";

import { useEffect, useState } from "react";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";
import { getStory } from "@/lib/actions/getStory";
import { TerminalProvider } from "@/context/TerminalContext";
import { useEngineStore } from "@/store/useEngineStore";
import { engine } from "@/lib/utils/engineInstance";
import { Stories } from "@/enums/Stories";

export default function Terminal() {
  const story = useEngineStore((state) => state.story);
  const setIsEntered = useEngineStore((state) => state.setIsEntered);

  const [isTerminalInitialized, setIsTerminalInitialized] =
    useState<boolean>(false);
  const [terminalLoading, setTerminalLoading] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);

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
  }, [story]);

  const handleCommand = async (input: string) => {
    await engine.run(input);
  };

  const handleInit = async () => {
    setTerminalLoading(true);
    setIsEntered(true);

    if (Array.isArray(story) && story.length > 0) {
      setIsTerminalInitialized(true);
      return;
    }

    const initStory = await getStory(Stories.INIT);
    if (initStory) {
      useEngineStore.getState().setStory(initStory);
      setIsTerminalInitialized(true);
    }
    setTerminalLoading(false);
  };

  if (!isTerminalInitialized) {
    return (
      <div className="mt-10 flex lg:block justify-center">
        {terminalLoading ? (
          <div className="crt-text">Loading...</div>
        ) : (
          <button
            className="teaser-component teaser-btn crt-text"
            onClick={handleInit}
          >
            ENTER
          </button>
        )}
      </div>
    );
  }

  return (
    <TerminalProvider>
      <div className="flex justify-center mt-6">
        <div className="terminal w-full lg:w-2/5 bg-black text-green-500 p-4 rounded-xl shadow h-64 overflow-auto">
          <div className="flex flex-col">
            {story &&
              story
                .slice(0, visibleLines)
                .map((item, index) => (
                  <TerminalLine
                    key={item.id ?? index}
                    item={item}
                    isLast={index === visibleLines - 1}
                  />
                ))}
            {story && visibleLines === story.length && (
              <TerminalInput onSubmit={handleCommand} />
            )}
          </div>
        </div>
      </div>
    </TerminalProvider>
  );
}
