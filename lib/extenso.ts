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

export function numberToPortugueseWords(input: string): string {
  const cleaned = input.replace(/\s/g, "").replace(/^0+/, "") || "0";

  if (!/^\d+$/.test(cleaned)) return "Número inválido";
  if (cleaned === "0") return "zero";
  if (cleaned.length > 18) return "Número muito grande (máximo: quatrilhões)";

  const groups: number[] = [];
  for (let i = cleaned.length; i > 0; i -= 3) {
    const start = Math.max(0, i - 3);
    groups.unshift(parseInt(cleaned.slice(start, i), 10));
  }

  if (groups.length > SCALE_GROUPS.length) return "Número muito grande";

  const parts: string[] = [];
  const totalGroups = groups.length;

  for (let i = 0; i < totalGroups; i++) {
    const value = groups[i];
    if (value === 0) continue;

    const level = totalGroups - 1 - i;
    const text = groupToPortugueseWords(value);
    const [singular, plural] = SCALE_GROUPS[level];

    if (level === 0) {
      parts.push(text);
    } else {
      parts.push(`${text} ${value === 1 ? singular : plural}`);
    }
  }

  if (parts.length === 0) return "zero";
  if (parts.length === 1) return parts[0];

  const last = parts.pop()!;
  return parts.join(", ") + " e " + last;
}
