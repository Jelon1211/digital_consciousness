"use client";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { AppMode } from "@/enums/AppMode";
import { eventBus } from "@/lib/events/EventBus";

export const EventBridge = () => {
  const { setAppMode } = useAppContext();

  useEffect(() => {
    const handleMode = ({ mode }: { mode: AppMode }) => {
      setAppMode(mode);
    };

    eventBus.on("mode:change", handleMode);
    return () => eventBus.off("mode:change", handleMode);
  }, [setAppMode]);

  return null;
};
