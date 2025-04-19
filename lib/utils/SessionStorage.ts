import { AppContext } from "@/types/AppContext";

export class SessionStorage {
  public static saveLastSession(session: AppContext): void {
    localStorage.setItem("lastSession", JSON.stringify(session));
  }

  public static loadLastSession(): AppContext | null {
    const raw = localStorage.getItem("lastSession");
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Nieprawidłowa sesja:", e);
      return null;
    }
  }
}
