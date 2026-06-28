"use client";

import { useState } from "react";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";
import { getStory } from "@/domain/content/actions/getStory";
import { TerminalProvider } from "@/features/terminal/context/TerminalContext";
import { useEngineStore } from "@/domain/engine/engine.store";
import { engine } from "@/domain/engine/engineInstance";
import { contentManifest } from "@/domain/content/contentManifest";
import { useTimedLines } from "@/shared/hooks/useTimedLines";

export default function Terminal() {
  const story = useEngineStore((state) => state.story);
  const isEntered = useEngineStore((state) => state.isEntered);
  const setIsEntered = useEngineStore((state) => state.setIsEntered);

  const [isTerminalInitialized, setIsTerminalInitialized] =
    useState<boolean>(false);
  const [terminalLoading, setTerminalLoading] = useState(false);
  const visibleLines = useTimedLines(story);
  const isTerminalReady =
    isTerminalInitialized ||
    (isEntered && Array.isArray(story) && story.length > 0);

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

    const initStory = await getStory(contentManifest.stories.init);
    if (initStory) {
      useEngineStore.getState().setStory(initStory);
      setIsTerminalInitialized(true);
    }
    setTerminalLoading(false);
  };

  if (!isTerminalReady) {
    return (
      <div className="mt-10 flex lg:block justify-center">
        {terminalLoading ? (
          <div className="teaser-component teaser-btn crt-text !cursor-default">
            Loading...
          </div>
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
      <div className="flex justify-center mt-20">
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
