import path from "path";
import { readFile } from "fs/promises";
import { validateStoryContent } from "./contentValidation";
import { JsonInterface } from "./story.types";

const DATA_ROOT = path.join(process.cwd(), "public", "data");

function resolveDataPath(relativePath: string) {
  const normalizedPath = relativePath.startsWith("/")
    ? relativePath.slice(1)
    : relativePath;
  const filePath = path.resolve(DATA_ROOT, normalizedPath);

  if (!filePath.startsWith(DATA_ROOT)) {
    throw new Error(`Blocked unsafe content path: ${relativePath}`);
  }

  return filePath;
}

export async function loadStoryContent(
  relativePath: string,
): Promise<JsonInterface[]> {
  const filePath = resolveDataPath(relativePath);
  const json = await readFile(filePath, "utf-8");
  const data = JSON.parse(json);

  return validateStoryContent(data, relativePath);
}
