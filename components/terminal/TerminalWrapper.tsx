"use client";

import { useEffect, useState } from "react";
import Terminal from "@/components/terminal/Terminal";
import { JsonInterface } from "@/types/JsonInterface";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { basicCommandMap } from "@/lib/commandMap";

export default function TerminalWrapper() {
  const [story, setStory] = useState<JsonInterface[] | null>(null);

  const loadStory = async (path: string) => {
    const result = await getStoryFromServer(path);
    setStory(result);
  };

  const handleInitialLoad = async () => {
    const lastCommand = localStorage.getItem("lastCommand");

    if (lastCommand && basicCommandMap[lastCommand]) {
      const storyFromCommand = await basicCommandMap[lastCommand]();
      if (storyFromCommand) {
        setStory(storyFromCommand);
        return;
      }
    }

    loadStory("/init.json");
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  if (!story)
    return (
      <div className="glitch flex justify-center items-center h-36">
        Loading...
      </div>
    );

  return (
    <>
      <Terminal story={story} />
    </>
  );
}
