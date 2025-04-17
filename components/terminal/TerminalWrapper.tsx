"use client";

import { useEffect, useRef, useState } from "react";
import Terminal from "@/components/terminal/Terminal";
import { JsonInterface } from "@/types/JsonInterface";
import { getStoryFromServer } from "@/lib/actions/getStoryFromServer";
import { TerminalProvider } from "@/context/TerminalContext";
import { useAppMode } from "@/context/AppModeContext";
import { CommandRegistry } from "@/lib/command/CommandRegistry";
import { CommandParser } from "@/lib/command/CommandParser";

// Komendy
import { StartCommand } from "@/lib/command/commands/StartCommand";
import { AppMode } from "@/enums/AppMode";
import { LastSession } from "@/types/Session";

export default function TerminalWrapper() {
  const [story, setStory] = useState<JsonInterface[]>([
    {
      id: 0,
      text: "Loading...",
      delay: 0,
      duration: 300,
    },
  ]);
  const [isTerminalInitalized, setIsTerminalInitalized] =
    useState<boolean>(false);

  const { appMode, setAppMode } = useAppMode();

  const registryRef = useRef(new CommandRegistry());
  const parserRef = useRef<CommandParser | null>(null);

  useEffect(() => {
    const registry = registryRef.current;
    registry.register(new StartCommand());

    parserRef.current = new CommandParser(registry, { appMode, setAppMode });

    handleInitialLoad();
  }, []);

  const handleInitialLoad = async () => {
    const parser = parserRef.current;
    if (!parser) return;

    const saved = localStorage.getItem("lastSession");
    if (saved) {
      try {
        const session: LastSession = JSON.parse(saved);

        const result = await parser.parse(session.command);

        if (result.success && result.story) {
          setAppMode(session.appMode);
          setStory(result.story);
          return;
        }
      } catch (e) {
        console.warn("Nieprawidłowa sesja:", e);
      }
    }

    const initStory = await getStoryFromServer("/init.json");
    if (initStory) {
      setAppMode(AppMode.INIT);
      setStory(initStory);
    } else {
      throw new Error("Could not load a story");
    }
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

  if (!story) {
    return (
      <div className="glitch flex justify-center items-center h-36">
        Loading...
      </div>
    );
  }

  return (
    <TerminalProvider>
      <Terminal story={story} />
    </TerminalProvider>
  );
}
