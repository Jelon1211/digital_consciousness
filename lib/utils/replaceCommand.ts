import { JsonInterface } from "@/types/JsonInterface";

const escapeHtml = (str: string): string =>
  str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const replaceCommand = (
  story: JsonInterface[],
  input: string
): JsonInterface[] => {
  return story.map((terminalLine) => ({
    ...terminalLine,
    text: terminalLine.text.replace(/<command>/g, escapeHtml(input)),
  }));
};
