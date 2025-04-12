"use client";

import { JsonInterface } from "@/types/JsonInterface";
import { JsonType } from "@/enums/JsonEnum";

export default function TerminalLine({
  item,
  isLast,
}: {
  item: JsonInterface;
  isLast: boolean;
}) {
  const text = item.text || "";
  const stepCount = Math.max(1, text.length);

  const animations: string[] = [];

  animations.push(
    `typewriter ${item.duration}ms steps(${stepCount}) 1 normal both`
  );

  if (isLast) {
    animations.push("blink 1s step-start infinite");
  }

  if (item.type === JsonType.COMMAND) {
    animations.push("glitch 1s infinite");
  }

  const baseStyle = {
    animation: animations.join(", "),
    borderRight:
      isLast && item.type !== JsonType.COMMAND
        ? "2px solid rgba(255, 255, 255, 0.75)"
        : "none",
  };

  const getClassName = () => {
    switch (item.type) {
      case JsonType.COMMAND:
        return "text-green-800";
      case JsonType.SYSTEM_MESSAGE:
        return "text-cyan-500 italic";
      case JsonType.ERROR:
        return "text-red-500 font-bold";
      default:
        return "";
    }
  };

  // Opcjonalna dekoracja
  const formatText = () => {
    if (item.type === JsonType.COMMAND) return `[${text}]`;
    if (item.type === JsonType.ERROR) return `❌ ${text}`;
    return text;
  };

  return (
    <p
      className={`inline-block overflow-hidden whitespace-nowrap ${getClassName()}`}
      style={baseStyle}
    >
      {formatText()}
    </p>
  );
}
