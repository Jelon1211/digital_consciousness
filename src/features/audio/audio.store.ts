import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AudioSettingsStore = {
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
};

export const useAudioSettingsStore = create<AudioSettingsStore>()(
  persist(
    (set) => ({
      musicVolume: 1,

      setMusicVolume: (volume) =>
        set({
          musicVolume: Math.min(1, Math.max(0, volume)),
        }),
    }),
    {
      name: "eris-audio-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
