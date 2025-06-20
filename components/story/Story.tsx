"use client";

import { engine } from "@/lib/utils/engineInstance";
import { useEffect, useState } from "react";
import Loading from "../base/Loading";
import { useEngineStore } from "@/store/useEngineStore";
import { JsonInterface } from "@/types/JsonInterface";
import { getStory } from "@/lib/actions/getStory";
import TerminalLine from "../terminal/TerminalLine";

export default function Story() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [story, setStory] = useState<JsonInterface[] | null>(null);
  const currentNode = useEngineStore((state) => state.currentNode);
  const currentSector = useEngineStore((state) => state.currentSector);
  const stateSetStory = useEngineStore((state) => state.setStory);

  useEffect(() => {
    const fetchStory = async () => {
      const storyData = await getStory(
        `/logs/sectors/${currentSector}/nodes/${currentNode}.json`
      );
      if (storyData) {
        setStory(storyData);
        stateSetStory(storyData);
      }
    };

    fetchStory();
  }, [currentNode, currentSector, stateSetStory]);

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleBack = async () => {
    await engine.run("back");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center mt-6">
      <div className="mx-5 p-3 rounded-xl shadow h-[55svh] lg:h-[65svh] overflow-auto story-panel w-full lg:w-1/4">
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
