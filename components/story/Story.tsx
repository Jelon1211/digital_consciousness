"use client";

import { useStory } from "@/context/StoryContext";

export default function Story() {
  const { isStory, setIsStory } = useStory();

  return <>{isStory && <div>test</div>}</>;
}
