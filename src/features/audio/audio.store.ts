import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AudioSettingsStore = {
  isMusic: boolean;
  musicVolume: number;
  beepVolume: number;
  setIsMusic: (isMusic: boolean) => void;
  setMusicVolume: (volume: number) => void;
  setBeepVolume: (volume: number) => void;
};

const clampVolume = (volume: number) => Math.min(1, Math.max(0, volume));

export const useAudioSettingsStore = create<AudioSettingsStore>()(
  persist(
    (set) => ({
      isMusic: true,
      musicVolume: 0.3,
      beepVolume: 0.15,

      setIsMusic: (isMusic) => set({ isMusic }),

      setMusicVolume: (volume) =>
        set({
          musicVolume: clampVolume(volume),
        }),

      setBeepVolume: (volume) =>
        set({
          beepVolume: clampVolume(volume),
        }),
    }),
    {
      name: "eris-audio-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
