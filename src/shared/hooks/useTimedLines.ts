import { JsonInterface } from "@/domain/content/story.types";
import { useEffect, useState } from "react";

export function useTimedLines(story: JsonInterface[] | null | undefined) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!story || story.length === 0) {
      setVisibleLines(0);
      return;
    }

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

  return visibleLines;
}
