"use client";

import { PreparedStoryI } from "@/domain/content/story.types";
import TerminalImageLine from "./TerminalImageLine";
import TerminalTextLine from "./TerminalTextLine";

export default function TerminalLine({
  item,
  isLast,
}: {
  item: PreparedStoryI;
  isLast: boolean;
}) {
  if (item.image) {
    return <TerminalImageLine src={item.image} />;
  }

  return <TerminalTextLine item={item} isLast={isLast} />;
}
