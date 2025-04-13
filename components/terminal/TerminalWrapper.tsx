"use client";

import { useEffect, useState } from "react";
import Terminal from "@/components/terminal/Terminal";
import { JsonInterface } from "@/types/JsonInterface";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { commandMap } from "@/lib/commandMap";

export default function TerminalWrapper() {
  const [story, setStory] = useState<JsonInterface[] | null>(null);
  const [isTerminalInitalized, setIsTerminalInitalized] =
    useState<boolean>(false);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  const loadStory = async (path: string) => {
    const result = await getStoryFromServer(path);
    setStory(result);
  };

  const handleInitialLoad = async () => {
    const lastCommand = localStorage.getItem("lastCommand");

    if (lastCommand && commandMap[lastCommand]) {
      const storyFromCommand = await commandMap[lastCommand]();
      if (storyFromCommand) {
        setStory(storyFromCommand);
        return;
      }
    }

    loadStory("/init.json");
  };

  if (!isTerminalInitalized) {
    return (
      <div className="flex justify-center">
        <button
          className="teaser-component teaser-btn crt-text"
          onClick={() => setIsTerminalInitalized(true)}
        >
          ENTER
        </button>
      </div>
    );
  }

  // 👇 po zainicjalizowaniu terminala, czekaj na story
  if (!story) {
    return (
      <div className="glitch flex justify-center items-center h-36">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Terminal story={story!} />
    </>
  );
}
