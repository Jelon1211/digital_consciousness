"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
    if (item.image) {
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setVisibleText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, item.duration / Math.max(1, text.length));

    return () => clearInterval(interval);
  }, [text, item.duration, item.image]);

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

  if (item.image) {
    console.log(item.image);
    return (
      <div className="flex justify-center items-center mt-5">
        <Image
          src={item.image}
          alt="Terminal Image"
          className="max-w-full rounded-lg shadow-md"
          priority={false}
          width={300}
          height={300}
        />
      </div>
    );
  }

  return (
    <p className={getClassName()}>
      {formatText()}
      {isLast && !inputFocused && (
        <span className="inline-block w-[2px] h-[1em] bg-white animate-blink translate-y-[3px] ml-0.5" />
      )}
    </p>
  );
}
