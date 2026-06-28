"use client";

import { useState } from "react";
import { useAudioSettingsStore } from "@/features/audio/audio.store";
import { useEngineStore } from "@/domain/engine/engine.store";

const sliderClassName = `
  w-full h-2 rounded-full appearance-none cursor-pointer bg-background caret-transparent

  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:w-5
  [&::-webkit-slider-thumb]:h-5
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-neon-secondary
  [&::-webkit-slider-thumb]:border
  [&::-webkit-slider-thumb]:border-neon
  [&::-webkit-slider-thumb]:shadow-[0_0_12px_var(--textNeonColorSecondary)]

  [&::-moz-range-thumb]:w-5
  [&::-moz-range-thumb]:h-5
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-neon-secondary
  [&::-moz-range-thumb]:border
  [&::-moz-range-thumb]:border-neon
  [&::-moz-range-thumb]:shadow-[0_0_12px_var(--textNeonColorSecondary)]
`;

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const isMusic = useAudioSettingsStore((state) => state.isMusic);
  const musicVolume = useAudioSettingsStore((state) => state.musicVolume);
  const beepVolume = useAudioSettingsStore((state) => state.beepVolume);
  const setMusicVolume = useAudioSettingsStore((state) => state.setMusicVolume);
  const setBeepVolume = useAudioSettingsStore((state) => state.setBeepVolume);

  const unitName = useEngineStore((state) => state.unitName);
  const resetEngine = useEngineStore((state) => state.resetEngine);

  return (
    <>
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="fixed top-5 right-5 z-[70] cursor-pointer select-none bg-transparent border-0 p-0 hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <span className="crt-text inline-block !text-[24px]">
          {isMenuOpen ? "X" : "☰"}
        </span>
      </button>

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`
          fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm
          transition-opacity duration-300 ease-in-out
          ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      <aside
        className={`
          fixed top-0 right-0 z-[60] h-dvh w-72 sm:w-80
          bg-black/90 border-l border-neon-secondary
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0 shadow-[0_0_25px_rgba(0,255,153,0.35)]" : "translate-x-full"}
        `}
      >
        <div className="h-full px-6 pt-20 pb-8 flex flex-col gap-8">
          <h2 className="crt-text !text-[18px] text-left">MENU</h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-neon-secondary text-xs uppercase tracking-widest">
                Muzyka
              </span>

              <span className="text-neon-secondary text-xs">
                {Math.round(musicVolume * 100)}% / {isMusic ? "ON" : "OFF"}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(musicVolume * 100)}
              onChange={(event) =>
                setMusicVolume(Number(event.target.value) / 100)
              }
              className={sliderClassName}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-neon-secondary text-xs uppercase tracking-widest">
                Dźwięk
              </span>

              <span className="text-neon-secondary text-xs">
                {Math.round(beepVolume * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(beepVolume * 100)}
              onChange={(event) =>
                setBeepVolume(Number(event.target.value) / 100)
              }
              className={sliderClassName}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-neon-secondary text-xs uppercase tracking-widest">
                Nazwa jednostki:
              </span>

              <span className="text-neon-secondary text-xs">
                {unitName ? unitName : "brak"}
              </span>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <button
              type="button"
              onClick={() => {
                resetEngine();
                setIsMenuOpen(false);
                window.location.reload();
              }}
              className="
                 w-full border border-cyber-red
                px-4 py-3
                text-cyber-red text-xs uppercase tracking-widest
                hover:bg-cyber-red hover:text-black
                shadow-[0_0_12px_var(--cyberRed)]
                transition-colors duration-500
                select-none
                cursor-pointer
              "
            >
              Zresetuj terminal
            </button>

            <div className="text-neon-secondary/50 text-xs uppercase tracking-widest">
              System online
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
