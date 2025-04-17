import { LastSession } from "@/types/Session";

export const saveLastSession = (session: LastSession) => {
  localStorage.setItem("lastSession", JSON.stringify(session));
};

export const loadLastSession = (): LastSession | null => {
  const raw = localStorage.getItem("lastSession");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Nieprawidłowa sesja:", e);
    return null;
  }
};
