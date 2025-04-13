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

      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      const rotateX = 75 + y * 7;
      const rotateY = x * 7;
      const rotateZ = -x * 3;

      const translateX = x * 7;
      const translateY = y * 3;

      grid.style.transform = `
            translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotateZ(${rotateZ}deg)
          `;

      timeoutId = setTimeout(() => {
        grid.classList.add("resetting");
        grid.style.transform = `
              translate(-50%, -50%)
              rotateX(75deg)
              rotateY(0deg)
              rotateZ(0deg)
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
    <div className="grid-main absolute inset-0 perspective">
      <div
        className="grid-lines"
        id="grid"
        style={{
          transform: "translate(-50%, -50%) rotateX(75deg)",
          transformStyle: "preserve-3d",
          top: "50%",
          left: "50%",
          position: "absolute",
          width: "200%",
          height: "200%",
        }}
      />
      <div className="vignette pointer-events-none absolute inset-0 z-10"></div>
    </div>
  );
}
