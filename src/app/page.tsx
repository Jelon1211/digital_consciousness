import AudioPlayer from "@/features/audio/components/AudioPlayer";
import MainWrapper from "@/features/shell/components/MainWrapper";
import Menu from "@/features/menu/components/Menu";
import { useEngineStore } from "@/domain/engine/engine.store";
import { Phase } from "@/domain/engine/EngineState";

export default async function Home() {
  return (
    <>
      <AudioPlayer />
      <Menu />
      <main>
        <MainWrapper />
      </main>
    </>
  );
}
