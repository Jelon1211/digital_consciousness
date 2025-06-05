"use client";
import { useEffect } from "react";

export default function Grid() {
  useEffect(() => {
    const grid = document.getElementById("grid");
    if (!grid) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let resetId: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      clearTimeout(resetId);

      grid.classList.remove("resetting");

      // Magic numbers do not touch
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      const rotateY = x * 8;
      const rotateZ = -x * 5;

      const translateX = x * 8;
      const translateY = y * 8;
      const translateZ = -y * 25;

      grid.style.transform = `
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        translateX(${translateX}px)
        translateY(${translateY}px) 
        translateZ(${translateZ}px) 
      `;

      timeoutId = setTimeout(() => {
        grid.classList.add("resetting");
        grid.style.transform = `
          rotateY(0deg)
          rotateZ(0deg)
          translateX(0px)
          translateY(0px)
          translateZ(0px)
        `;

        resetId = setTimeout(() => {
          grid.classList.remove("resetting");
        }, 1000);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
      clearTimeout(resetId);
    };
  }, []);

  return (
    <div className="grid-main">
      <div className="grid-animated">
        <div id="grid" className="grid-lines" />
      </div>
      <div className="vignette pointer-events-none absolute inset-0 z-10" />
    </div>
  );
}
