import { readFile } from "node:fs/promises";
import { readdirSync } from "node:fs";
import path from "node:path";

const dataRoot = path.join(process.cwd(), "public", "data");
const validTypes = new Set(["text", "command", "system_message", "error"]);

function collectJsonFiles(directory) {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectJsonFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(entryPath);
    }
  }

  return files;
}

function typeName(value) {
  return Array.isArray(value) ? "array" : typeof value;
}

function validateStory(data, source) {
  const errors = [];

  if (!Array.isArray(data)) {
    return [`${source}: expected array, got ${typeName(data)}`];
  }

  data.forEach((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      errors.push(
        `${source}[${index}]: expected object, got ${typeName(item)}`,
      );
      return;
    }

    if (typeof item.text !== "string") {
      errors.push(
        `${source}[${index}].text: expected string, got ${typeName(item.text)}`,
      );
    }

    if (typeof item.delay !== "number") {
      errors.push(
        `${source}[${index}].delay: expected number, got ${typeName(item.delay)}`,
      );
    }

    if (typeof item.duration !== "number") {
      errors.push(
        `${source}[${index}].duration: expected number, got ${typeName(item.duration)}`,
      );
    }

    if (item.type !== undefined && typeof item.type !== "string") {
      errors.push(
        `${source}[${index}].type: expected string, got ${typeName(item.type)}`,
      );
    }

    if (typeof item.type === "string" && !validTypes.has(item.type)) {
      errors.push(`${source}[${index}].type: unsupported value "${item.type}"`);
    }

    if (item.image !== undefined && typeof item.image !== "string") {
      errors.push(
        `${source}[${index}].image: expected string, got ${typeName(item.image)}`,
      );
    }
  });

  return errors;
}

const errors = [];

for (const file of collectJsonFiles(dataRoot)) {
  const source = path.relative(dataRoot, file);

  try {
    const data = JSON.parse(await readFile(file, "utf-8"));
    errors.push(...validateStory(data, source));
  } catch (error) {
    errors.push(
      `${source}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Content validation passed.");
