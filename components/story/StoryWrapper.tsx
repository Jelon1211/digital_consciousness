"use client";

import { StoryProvider } from "@/context/StoryContext";
import Story from "./Story";

export default function StoryWrapper() {
  return (
    <>
      <StoryProvider>
        <Story />
      </StoryProvider>
    </>
  );
}
