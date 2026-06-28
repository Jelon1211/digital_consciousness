import { JsonType } from "@/domain/content/jsonTypes";
import { JsonInterface } from "@/domain/content/story.types";

const validLineTypes = new Set<string>(Object.values(JsonType));

const getTypeName = (value: unknown) =>
  Array.isArray(value) ? "array" : typeof value;

export function validateStoryContent(
  data: unknown,
  source: string
): JsonInterface[] {
  if (!Array.isArray(data)) {
    throw new Error(`${source}: expected an array of story lines`);
  }

  const errors: string[] = [];

  data.forEach((line, index) => {
    if (!line || typeof line !== "object" || Array.isArray(line)) {
      errors.push(`[${index}] expected object, got ${getTypeName(line)}`);
      return;
    }

    const item = line as Record<string, unknown>;

    if (typeof item.id !== "number") {
      errors.push(`[${index}].id expected number, got ${getTypeName(item.id)}`);
    }

    if (typeof item.text !== "string") {
      errors.push(
        `[${index}].text expected string, got ${getTypeName(item.text)}`
      );
    }

    if (typeof item.delay !== "number") {
      errors.push(
        `[${index}].delay expected number, got ${getTypeName(item.delay)}`
      );
    }

    if (typeof item.duration !== "number") {
      errors.push(
        `[${index}].duration expected number, got ${getTypeName(item.duration)}`
      );
    }

    if (item.type !== undefined && typeof item.type !== "string") {
      errors.push(
        `[${index}].type expected string, got ${getTypeName(item.type)}`
      );
    }

    if (typeof item.type === "string" && !validLineTypes.has(item.type)) {
      errors.push(`[${index}].type has unsupported value "${item.type}"`);
    }

    if (item.image !== undefined && typeof item.image !== "string") {
      errors.push(
        `[${index}].image expected string, got ${getTypeName(item.image)}`
      );
    }
  });

  if (errors.length > 0) {
    throw new Error(`${source} content validation failed:\n${errors.join("\n")}`);
  }

  return data as JsonInterface[];
}
