import { AppEventMap, Listener } from "@/types/EventMap";

export class EventBus<Events extends Record<string, unknown>> {
  private listeners: { [K in keyof Events]?: Listener<Events[K]>[] } = {};

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.listeners[event]?.forEach((listener) => listener(payload));
  }

  on<K extends keyof Events>(event: K, callback: Listener<Events[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof Events>(event: K, callback: Listener<Events[K]>) {
    const callbacks = this.listeners[event];
    if (!callbacks) return;
    this.listeners[event] = callbacks.filter((cb) => cb !== callback);
  }
}

export const eventBus = new EventBus<AppEventMap>();
