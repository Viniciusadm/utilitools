const UNITS = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
const TEENS = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
const TENS = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
const HUNDREDS = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

const SCALE_GROUPS = [
  ["", ""],
  ["mil", "mil"],
  ["milhão", "milhões"],
  ["bilhão", "bilhões"],
  ["trilhão", "trilhões"],
  ["quatrilhão", "quatrilhões"],
];

function groupToPortugueseWords(n: number): string {
  if (n === 0) return "";
  if (n === 100) return "cem";

  const parts: string[] = [];
  const c = Math.floor(n / 100);
  const d = Math.floor((n % 100) / 10);
  const u = n % 10;

  if (c > 0) parts.push(HUNDREDS[c]);

  if (d === 1) {
    parts.push(TEENS[u]);
  } else {
    if (d > 1) parts.push(TENS[d]);
    if (u > 0) parts.push(UNITS[u]);
  }

  return parts.join(" e ");
}

export type SpellOutError = "invalid" | "tooLarge";

export type SpellOutResult = { words: string } | { error: SpellOutError };

export const MAX_SPELL_OUT_DIGITS = 18;

export function numberToPortugueseWords(input: string): SpellOutResult {
  const cleaned = input.replace(/\s/g, "").replace(/^0+/, "") || "0";

  if (!/^\d+$/.test(cleaned)) return { error: "invalid" };
  if (cleaned === "0") return { words: "zero" };
  if (cleaned.length > MAX_SPELL_OUT_DIGITS) return { error: "tooLarge" };

  const groups: number[] = [];
  for (let i = cleaned.length; i > 0; i -= 3) {
    const start = Math.max(0, i - 3);
    groups.unshift(parseInt(cleaned.slice(start, i), 10));
  }

  if (groups.length > SCALE_GROUPS.length) return { error: "tooLarge" };

  const parts: string[] = [];
  const totalGroups = groups.length;
  let lastGroupValue = 0;

  for (let i = 0; i < totalGroups; i++) {
    const value = groups[i];
    if (value === 0) continue;

    const level = totalGroups - 1 - i;
    const text = groupToPortugueseWords(value);
    const [singular, plural] = SCALE_GROUPS[level];
    lastGroupValue = value;

    if (level === 0) {
      parts.push(text);
    } else if (level === 1 && value === 1) {
      parts.push(singular);
    } else {
      parts.push(`${text} ${value === 1 ? singular : plural}`);
    }
  }

  if (parts.length === 0) return { words: "zero" };
  if (parts.length === 1) return { words: parts[0] };

  const last = parts.pop()!;
  const needsConjunction = lastGroupValue < 100 || lastGroupValue % 100 === 0;
  return { words: parts.join(" ") + (needsConjunction ? " e " : " ") + last };
}
