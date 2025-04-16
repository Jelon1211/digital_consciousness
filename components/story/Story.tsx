"use client";

import { useStory } from "@/context/StoryContext";
import { useEffect } from "react";

export default function Story() {
  const { isStory } = useStory();
  useEffect(() => {}, []);

  console.log(isStory);

  return <>{isStory && <div>test</div>}</>;
}
