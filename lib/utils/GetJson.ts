export class GetJson {
  public static async loadJson<T>(relativePath: string): Promise<T | null> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const res = await fetch(`${baseUrl}/data${relativePath}`);
      if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
      return (await res.json()) as T;
    } catch (err) {
      console.error(`Błąd podczas wczytywania pliku ${relativePath}:`, err);
      return null;
    }
  }
}
