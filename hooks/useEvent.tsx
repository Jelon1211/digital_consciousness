"use client";

import { eventBus } from "@/lib/events/EventBus";
import { AppEventMap } from "@/types/EventMap";
import { useEffect } from "react";

export function useEvent<K extends keyof AppEventMap>(
  event: K,
  callback: (payload: AppEventMap[K]) => void
) {
  useEffect(() => {
    eventBus.on(event, callback);
    return () => {
      eventBus.off(event, callback);
    };
  }, [event, callback]);
}
