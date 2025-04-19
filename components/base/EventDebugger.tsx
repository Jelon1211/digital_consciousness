"use client";

import { useEvent } from "@/hooks/useEvent";

export default function EventDebugger() {
  useEvent("command:error", ({ input, error }) => {
    console.error("[EVENT] ❌ command:error", { input, error });
  });

  useEvent("command:executed", ({ input }) => {
    console.log("[EVENT] ✅ command:executed", { input });
  });

  useEvent("mode:change", ({ mode }) => {
    console.log("[EVENT] 🔄 mode:change →", mode);
  });

  useEvent("story:loaded", ({ story }) => {
    console.log("[EVENT] 📖 story:loaded", story);
  });

  useEvent("command:not-found", ({ input }) => {
    console.warn("[EVENT] ⚠️ command:not-found", { input });
  });

  useEvent("command:invalid-context", ({ command }) => {
    console.warn("[EVENT] 🚫 command:invalid-context", { command });
  });

  return null;
}
