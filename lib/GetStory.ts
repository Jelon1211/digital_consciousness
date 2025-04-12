import fs from "fs";
import path from "path";

export class GetStory {
  public static async loadJson<T>(relativePath: string): Promise<T | null> {
    const filePath = path.join(process.cwd(), "data", relativePath);

    try {
      const fileContents = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(fileContents) as T;
    } catch (err) {
      console.error(`Błąd podczas wczytywania pliku ${relativePath}:`, err);
      return null;
    }
  }
}
