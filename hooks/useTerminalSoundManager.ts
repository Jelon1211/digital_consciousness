import { AppConfig } from "@/config/appConfig";
import { useRef, useEffect, useCallback } from "react";

export function useTerminalSoundManager() {
  const beepSoundsRef = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    beepSoundsRef.current = AppConfig.beeps.map((src) => {
      const audio = new Audio(src);
      return audio;
    });
  }, []);

  const playBeep = useCallback(() => {
    if (beepSoundsRef.current.length === 0) return;

    const random = Math.floor(Math.random() * beepSoundsRef.current.length);
    const sound = beepSoundsRef.current[random].cloneNode() as HTMLAudioElement;

    sound.volume = AppConfig.beepVolume;
    sound.play().catch(() => {});
  }, []);

  return {
    playBeep,
  };
}
