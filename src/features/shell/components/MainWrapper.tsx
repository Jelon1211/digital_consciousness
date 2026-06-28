"use client";
import { useEngineStore } from "@/domain/engine/engine.store";
import Grid from "@/features/background/components/Grid";
import Story from "@/features/story/components/Story";

import Terminal from "@/features/terminal/components/Terminal";
import { Phase } from "@/domain/engine/EngineState";

export default function MainWrapper() {
  const isPhaseNode = useEngineStore((state) => state.phase === Phase.NODE);

  return (
    <>
      <Grid />
      {isPhaseNode ? <Story /> : <Terminal />}
    </>
  );
}
