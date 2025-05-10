"use client";

import { Phase } from "@/core/engine/EngineState";
import { useEngineStore } from "@/store/useEngineStore";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AudioPlayer() {
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState("/audio/evil.mp3");

  const audioRef = useRef<HTMLAudioElement>(null);
  const isEntered = useEngineStore((state) => state.isEntered);
  const isPhaseNode = useEngineStore((state) => state.phase === Phase.NODE);

  useEffect(() => {
    const audio = audioRef.current;
    if (isEntered && audio && audio.paused) {
      audio.muted = false;
      audio.volume = 0.05;
      audio.play();
      setIsAudioEnabled(true);
    }
  }, [isEntered]);

  useEffect(() => {
    const audio = audioRef.current;
    const newSrc = isPhaseNode ? "/audio/apathias.mp3" : "/audio/evil.mp3";

    if (!audio || audio.src === window.location.origin + newSrc) return;

    const wasPlaying = !audio.paused;
    audio.pause();
    audio.src = newSrc;
    setAudioSrc(newSrc);

    if (wasPlaying) {
      const handleCanPlay = () => {
        audio.muted = false;
        audio.volume = isPhaseNode ? 0.05 : 0.03;
        audio.play();
        audio.removeEventListener("canplaythrough", handleCanPlay);
      };

      audio.addEventListener("canplaythrough", handleCanPlay);
      audio.load();
    }
  }, [isPhaseNode]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.muted = false;
      audio.volume = isPhaseNode ? 0.05 : 0.3;
      audio.play();
      setIsAudioEnabled(true);
    } else {
      if (audio) {
        audio.pause();
        setIsAudioEnabled(false);
      }
    }
  };

  return (
    <div
      className="cursor-pointer crt-text w-fit absolute top-1 -right-15 hover:scale-105 transition-all duration-300 ease-in-out"
      onClick={() => togglePlay()}
    >
      {isAudioEnabled ? (
        <Image
          src="/stop.svg"
          width={40}
          height={40}
          alt="stop icon"
          className="invert sepia brightness-200 hue-rotate-[120deg]"
        />
      ) : (
        <Image
          src="/play.svg"
          width={40}
          height={40}
          alt="start icon"
          className="invert sepia brightness-200 hue-rotate-[120deg]"
        />
      )}
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
