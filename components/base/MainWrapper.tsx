"use client";
import { useEngineStore } from "@/store/useEngineStore";
import Grid from "../grid/Grid";
import Story from "../story/Story";

import Terminal from "../terminal/Terminal";
import { Phase } from "@/core/engine/EngineState";

export default function MainWrapper() {
  const isPhaseNode = useEngineStore((state) => state.phase === Phase.NODE);

  return (
    <>
      <Grid />
      {isPhaseNode ? <Story /> : <Terminal />}
    </>
  );
}
