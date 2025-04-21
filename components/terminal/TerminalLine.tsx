"use client";

import { useEffect, useState } from "react";
import { JsonInterface } from "@/types/JsonInterface";
import { JsonType } from "@/enums/JsonEnum";
import { useTerminal } from "@/context/TerminalContext";

export default function TerminalLine({
  item,
  isLast,
}: {
  item: JsonInterface;
  isLast: boolean;
}) {
  const text = item.text || "";
  const [visibleText, setVisibleText] = useState("");
  const { inputFocused } = useTerminal();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setVisibleText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, item.duration / Math.max(1, text.length));

    return () => clearInterval(interval);
  }, [text, item.duration]);

  const getClassName = () => {
    let base = "inline-block whitespace-pre-wrap break-words";
    if (item.type === JsonType.COMMAND) base += " text-green-800 glitch";
    if (item.type === JsonType.SYSTEM_MESSAGE) base += " text-cyan-500 italic";
    if (item.type === JsonType.ERROR) base += " text-red-500 font-bold";
    return base;
  };

  const formatText = () => {
    if (item.type === JsonType.COMMAND) return `[${visibleText}]`;
    if (item.type === JsonType.ERROR) return `❌ ${visibleText}`;
    return visibleText;
  };

  return (
    <p className={getClassName()}>
      {formatText()}
      {isLast && !inputFocused && (
        <span className="inline-block w-[2px] h-[1em] bg-white animate-blink translate-y-[3px] ml-0.5" />
      )}
    </p>
  );
}
