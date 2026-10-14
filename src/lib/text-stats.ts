const WORDS_PER_MINUTE_READING = 200;
const WORDS_PER_MINUTE_SPEAKING = 130;

export type TextStats = {
  characters: number;
  charactersWithoutSpaces: number;
  words: number;
  lines: number;
  paragraphs: number;
  sentences: number;
  readingSeconds: number;
  speakingSeconds: number;
};

export function countCharacters(text: string) {
  return Array.from(text).length;
}

export function textStats(text: string): TextStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  return {
    characters: countCharacters(text),
    charactersWithoutSpaces: countCharacters(text.replace(/\s/g, "")),
    words,
    lines: text ? text.split("\n").length : 0,
    paragraphs: trimmed ? trimmed.split(/\n\s*\n/).length : 0,
    sentences: trimmed ? (trimmed.match(/[^.!?…]+([.!?…]+|$)/g) ?? []).filter((s) => s.trim()).length : 0,
    readingSeconds: Math.ceil((words / WORDS_PER_MINUTE_READING) * 60),
    speakingSeconds: Math.ceil((words / WORDS_PER_MINUTE_SPEAKING) * 60),
  };
}

export function formatDuration(totalSeconds: number) {
  if (totalSeconds < 60) return `${totalSeconds} s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return seconds ? `${minutes} min ${seconds} s` : `${minutes} min`;
}
