import { useEffect, useState } from "react";

type UseTypewriterTextOptions = {
  duration: number;
  enabled?: boolean;
  onVisibleCharacter?: (character: string) => void;
};

export function useTypewriterText(
  text: string,
  { duration, enabled = true, onVisibleCharacter }: UseTypewriterTextOptions
) {
  const [visibleText, setVisibleText] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setVisibleText(text);
      return;
    }

    setVisibleText("");

    let index = 0;
    const interval = setInterval(() => {
      const nextText = text.slice(0, index + 1);
      setVisibleText(nextText);
      onVisibleCharacter?.(text[index] ?? "");

      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, duration / Math.max(1, text.length));

    return () => clearInterval(interval);
  }, [duration, enabled, onVisibleCharacter, text]);

  return visibleText;
}
