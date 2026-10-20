export const REGEX_FLAGS = ["g", "i", "m", "s", "u"] as const;

export type RegexFlag = (typeof REGEX_FLAGS)[number];

export type RegexMatch = {
  index: number;
  text: string;
  groups: (string | undefined)[];
};

export const MAX_MATCHES = 1000;

export function compileRegex(pattern: string, flags: readonly RegexFlag[]) {
  try {
    return new RegExp(pattern, flags.join(""));
  } catch {
    return null;
  }
}

export function findMatches(regex: RegExp, text: string) {
  const global = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : `${regex.flags}g`);
  const matches: RegexMatch[] = [];
  for (const match of text.matchAll(global)) {
    matches.push({ index: match.index, text: match[0], groups: match.slice(1) });
    if (matches.length >= MAX_MATCHES || !regex.flags.includes("g")) break;
  }
  return matches;
}

export type TextSegment = { text: string; match: boolean };

export function splitByMatches(text: string, matches: readonly RegexMatch[]) {
  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const { index, text: matched } of matches) {
    if (!matched) continue;
    if (index > cursor) segments.push({ text: text.slice(cursor, index), match: false });
    segments.push({ text: matched, match: true });
    cursor = index + matched.length;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false });
  return segments;
}
