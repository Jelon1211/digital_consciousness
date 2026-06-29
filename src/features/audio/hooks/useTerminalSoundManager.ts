import { AppConfig } from "@/shared/config/appConfig";
import { useRef, useEffect, useCallback } from "react";
import { useAudioSettingsStore } from "@/features/audio/audio.store";

export function useTerminalSoundManager() {
  const beepSoundsRef = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    beepSoundsRef.current = AppConfig.beeps.map((src) => {
      const audio = new Audio(src);
      return audio;
    });
  }, []);

  const playBeep = useCallback(() => {
    if (beepSoundsRef.current.length === 0) {
      return;
    }

    const random = Math.floor(Math.random() * beepSoundsRef.current.length);
    const sound = beepSoundsRef.current[random].cloneNode() as HTMLAudioElement;
    const { beepVolume } = useAudioSettingsStore.getState();

    sound.volume = Math.min(1, AppConfig.beepVolume * beepVolume);
    sound.play().catch(() => {
      // TODO: fix that, it is called too often
      console.warn("Catch on sound.play()");
    });
  }, []);

  return {
    playBeep,
  };
}
