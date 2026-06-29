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
    <div className="flex justify-center mt-10">
      <div className="mx-5 p-3 rounded-xl shadow h-[calc(100vh-7rem)] overflow-auto story-panel w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-5xl">
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
        <div className="p-4">
          <button
            className="teaser-component teaser-btn crt-text"
            onClick={handleBack}
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
