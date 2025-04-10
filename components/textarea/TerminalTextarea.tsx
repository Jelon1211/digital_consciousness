"use client";

import { useEffect, useState } from "react";

type StoryLine = {
  id: string;
  text: string;
  delay: number;
  showInput?: boolean;
};

export default function TerminalTextarea() {
  const [lines, setLines] = useState<StoryLine[]>([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchAndRender = async () => {
      const res = await fetch("/api/story");
      const story: StoryLine[] = await res.json();

      let i = 0;

      const loop = async () => {
        if (i >= story.length) return;
        const currentLine = story[i];
        setLines((prev) => [...prev, currentLine]);

        if (currentLine.showInput) {
          setShowInput(true);
        }

        i++;
        setTimeout(loop, currentLine.delay || 1000);
      };

      loop();
    };

    fetchAndRender();
  }, []);

  return (
    <div
      className="terminal bg-black text-green-400 p-4 rounded-xl shadow-lg relative overflow-hidden max-w-xl mx-auto mt-10 w-full h-64"
      style={{
        fontFamily: "var(--font-vcr)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/scanlines.jpg')] opacity-20 mix-blend-overlay"></div>

      <div className="absolute inset-0 border border-green-500 opacity-30 rounded-xl blur-sm"></div>

      {lines.map((line, index) => (
        <p key={index} className="terminal-line">
          {line.text}
        </p>
      ))}
      {/* <textarea
        className="w-full h-64 bg-transparent text-green-400 text-sm resize-none focus:outline-none caret-green-300 z-20 relative glitch-text"
        placeholder="> VCR OSD MONO"
      /> */}
    </div>
  );
}
