"use client";

import { engine } from "@/domain/engine/engineInstance";
import { useEffect, useState } from "react";
import Loading from "@/features/loading/components/Loading";
import { useEngineStore } from "@/domain/engine/engine.store";
import { getStory } from "@/domain/content/actions/getStory";
import TerminalLine from "@/features/terminal/components/TerminalLine";
import { getNodeById } from "@/domain/content/contentManifest";
import { useTimedLines } from "@/shared/hooks/useTimedLines";

const LOADING_TIME =
  process.env.NEXT_PUBLIC_API_URL === "production" ? 3000 : 1000;

export default function Story() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const story = useEngineStore((state) => state.story);
  const currentNode = useEngineStore((state) => state.currentNode);
  const currentSector = useEngineStore((state) => state.currentSector);
  const stateSetStory = useEngineStore((state) => state.setStory);
  const visibleLines = useTimedLines(story);

  useEffect(() => {
    const fetchStory = async () => {
      if (story && story.length > 0) {
        return;
      }

      const node = getNodeById(currentSector, currentNode);
      if (!node) {
        return;
      }

      const storyData = await getStory(node.storyPath);
      if (storyData) {
        stateSetStory(storyData);
      }
    };

    fetchStory();
  }, [currentNode, currentSector, stateSetStory, story]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIME);

    return () => clearTimeout(timeout);
  }, []);

  const handleBack = async () => {
    await engine.run("back");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center px-5 h-[calc(100dvh-6rem)] ">
      <div className="p-3 rounded-xl shadow story-panel w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-5xl flex flex-col min-h-0">
        <div className="flex-1 overflow-auto min-h-0 pt-4 overflow-x-hidden">
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
          </div>
        </div>

        <div className="p-4 shrink-0">
          <button
            className="teaser-component teaser-btn crt-text mt-0"
            onClick={handleBack}
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
