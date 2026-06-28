"use client";

import { useCallback, useRef } from "react";
import parse from "html-react-parser";
import { JsonType } from "@/domain/content/jsonTypes";
import { useTerminal } from "@/features/terminal/context/TerminalContext";
import { useTerminalSoundManager } from "@/features/audio/hooks/useTerminalSoundManager";
import { useEngineStore } from "@/domain/engine/engine.store";
import { Phase } from "@/domain/engine/EngineState";
import { AppConfig } from "@/shared/config/appConfig";
import { JsonInterface } from "@/domain/content/story.types";
import { useTypewriterText } from "./useTypewriterText";
import TerminalCursor from "./TerminalCursor";

type TerminalTextLineProps = {
  item: JsonInterface;
  isLast: boolean;
};

export default function TerminalTextLine({
  item,
  isLast,
}: TerminalTextLineProps) {
  const text = item.text || "";
  const lastBeepRef = useRef(0);
  const { inputFocused } = useTerminal();
  const { playBeep } = useTerminalSoundManager();
  const isNode = useEngineStore((state) => state.phase === Phase.NODE);

  const handleVisibleCharacter = useCallback(
    (character: string) => {
      const now = Date.now();

      if (
        now - lastBeepRef.current > AppConfig.beepInterval &&
        character !== " " &&
        !isNode
      ) {
        playBeep();
        lastBeepRef.current = now;
      }
    },
    [isNode, playBeep]
  );

  const visibleText = useTypewriterText(text, {
    duration: item.duration,
    onVisibleCharacter: handleVisibleCharacter,
  });

  const getClassName = () => {
    let base = "inline-block whitespace-pre-wrap break-words";

    switch (item.type) {
      case JsonType.COMMAND:
        base += " text-green-800 glitch";
        break;
      case JsonType.SYSTEM_MESSAGE:
        base += " text-cyan-500 italic";
        break;
      case JsonType.ERROR:
        base += " text-red-500 font-bold";
        break;
      default:
        break;
    }

    return base;
  };

  const formatText = () => {
    const parsedText = parse(visibleText);

    if (item.type === JsonType.COMMAND) return <span>[{parsedText}]</span>;
    if (item.type === JsonType.ERROR) return <span>ERR {parsedText}</span>;
    return <>{parsedText}</>;
  };

  return (
    <p className={getClassName()}>
      {formatText()}
      {isLast && !inputFocused && <TerminalCursor />}
    </p>
  );
}
