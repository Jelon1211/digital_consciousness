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
      <div
        className={`flex flex-col lg:flex-row px-10 gap-10 mt-15 ${
          isPhaseNode ? "justify-center lg:justify-between" : "justify-center"
        }`}
      >
        <Terminal />
        {isPhaseNode ? <Story /> : null}
      </div>
    </>
  );
}
