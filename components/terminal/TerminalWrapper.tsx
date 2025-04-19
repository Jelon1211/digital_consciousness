"use client";

import { useEffect, useRef, useState } from "react";
import Terminal from "@/components/terminal/Terminal";
import { JsonInterface } from "@/types/JsonInterface";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { TerminalProvider } from "@/context/TerminalContext";
import { useAppContext } from "@/context/AppContext";
import { CommandRegistry } from "@/lib/command/CommandRegistry";
import { CommandParser } from "@/lib/command/CommandParser";
import { StartCommand } from "@/lib/command/commands/StartCommand";
import { SessionStorage } from "@/lib/utils/SessionStorage";
import { AppMode } from "@/enums/AppMode";
import { useEvent } from "@/hooks/useEvent";
import { LogsCommand } from "@/lib/command/commands/LogsCommand";

export default function TerminalWrapper() {
  const [story, setStory] = useState<JsonInterface[]>([]);
  const [isTerminalInitialized, setIsTerminalInitialized] = useState(false);

  const appContext = useAppContext();

  const registryRef = useRef(new CommandRegistry());
  const parserRef = useRef<CommandParser | null>(null);

  useEvent("story:loaded", ({ story }) => {
    setStory(story);
  });

  useEffect(() => {
    const registry = registryRef.current;
    registry.register(new StartCommand());
    registry.register(new LogsCommand());

    console.log("kidy to się wykonuje i jaki jest context", appContext);

    parserRef.current = new CommandParser(registry, appContext);

    handleInitialLoad();
  }, [appContext]);

  const handleInitialLoad = async () => {
    const parser = parserRef.current;
    if (!parser) return;

    const saved = SessionStorage.loadLastSession();

    if (saved && saved.lastCommand) {
      return await parser.parse(saved.lastCommand);
    }

    const initStory = await getStoryFromServer("/init.json");
    if (initStory) {
      appContext.setAppMode(AppMode.INIT);
      setStory(initStory);
    } else {
      throw new Error("Could not load initial story");
    }
  };

  if (!isTerminalInitialized) {
    return (
      <div className="flex justify-center mt-10">
        <button
          className="teaser-component teaser-btn crt-text"
          onClick={() => setIsTerminalInitialized(true)}
        >
          ENTER
        </button>
      </div>
    );
  }

  return (
    <TerminalProvider>
      <Terminal story={story} parserRef={parserRef} />
    </TerminalProvider>
  );
}
