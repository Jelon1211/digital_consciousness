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
      <div className="mt-5">
        <div
          className={
            isPhaseNode
              ? `w-fit absolute top-6 left-20 sm:top-4 sm:left-25`
              : `flex justify-center items-center w-full`
          }
        >
          <h1 className="crt-text" data-text="ERIS">
            ERIS
          </h1>
        </div>
        <div className={isPhaseNode ? "hidden" : ""}>
          <p className="crt-text uppercase mt-10 text-center">
            The city never sleeps. Welcome to the grid.
          </p>
        </div>
      </div>
      <Grid />
      {isPhaseNode ? <Story /> : <Terminal />}
    </>
  );
}
