"use client";

import { Phase } from "@/core/engine/EngineState";
import { useEngineStore } from "@/store/useEngineStore";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AppConfig } from "@/config/appConfig";
import { useAudioSettingsStore } from "@/store/useAudioSettingsStore";

export default function AudioPlayer() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [audioSrc, setAudioSrc] = useState(AppConfig.audioEvil);

  const audioRef = useRef<HTMLAudioElement>(null);
  const isEntered = useEngineStore((state) => state.isEntered);
  const isPhaseNode = useEngineStore((state) => state.phase === Phase.NODE);
  const isMusic = useEngineStore((state) => state.isMusic);
  const setIsMusic = useEngineStore((state) => state.setIsMusic);

  const musicVolume = useAudioSettingsStore((state) => state.musicVolume);

  const getVolume = useCallback(
    () =>
      (isPhaseNode ? AppConfig.musicNodeVolume : AppConfig.musicMainVolume) *
      musicVolume,
    [isPhaseNode, musicVolume],
  );

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.muted = false;
    audio.volume = getVolume();
    audio.play().catch(() => {});
    setIsAudioEnabled(true);
  }, [getVolume]);

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    setIsAudioEnabled(false);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      setIsMusic(true);
      playAudio();
    } else {
      setIsMusic(false);
      pauseAudio();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = getVolume();
  }, [getVolume]);

  useEffect(() => {
    if (isEntered && audioRef.current?.paused && isMusic) {
      playAudio();
    }
  }, [isEntered, isMusic, playAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    const newSrc = isPhaseNode ? AppConfig.audioApathias : AppConfig.audioEvil;
    if (!audio || audio.src === window.location.origin + newSrc) {
      return;
    }

    const wasPlaying = !audio.paused;
    audio.pause();
    audio.src = newSrc;
    setAudioSrc(newSrc);

    if (wasPlaying) {
      const handleCanPlay = () => {
        playAudio();
        audio.removeEventListener("canplaythrough", handleCanPlay);
      };
      audio.addEventListener("canplaythrough", handleCanPlay);
      audio.load();
    }
  }, [isPhaseNode, playAudio]);

  return (
    <div
      className="cursor-pointer crt-text w-fit absolute top-5 -right-5 hover:scale-105 transition-all duration-300 ease-in-out"
      onClick={togglePlay}
    >
      <Image
        src={isAudioEnabled ? AppConfig.stopSVG : AppConfig.playSVG}
        width={40}
        height={40}
        alt={isAudioEnabled ? "stop icon" : "start icon"}
        className="invert sepia brightness-200 hue-rotate-[120deg]"
      />
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay
        loop
        muted={!isAudioEnabled}
      />
    </div>
  );
}
