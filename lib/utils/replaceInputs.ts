import { JsonInterface } from "@/types/JsonInterface";

const escapeHtml = (str: string): string =>
  str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const replacePlaceholders = (
  story: JsonInterface[],
  replacements: Record<string, string>
): JsonInterface[] => {
  return story.map((terminalLine) => {
    let newText = terminalLine.text;
    for (const [key, value] of Object.entries(replacements)) {
      const escapedValue = escapeHtml(value);
      const regex = new RegExp(`<${key}>`, "g");
      newText = newText.replace(regex, escapedValue);
    }
    return {
      ...terminalLine,
      text: newText,
    };
  });
};

export const replacePlaceholderObject = (
  command: string = "",
  name: string = ""
) => {
  return {
    command: command,
    name: name,
  };
};
