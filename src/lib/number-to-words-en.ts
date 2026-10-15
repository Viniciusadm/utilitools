import { MAX_SPELL_OUT_DIGITS, type SpellOutResult } from "@/lib/extenso";

const ONES = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const SCALES = ["", "thousand", "million", "billion", "trillion", "quadrillion"];

function belowHundredToWords(n: number): string {
  if (n < 20) return ONES[n];
  const tens = TENS[Math.floor(n / 10)];
  const ones = n % 10;
  return ones ? `${tens}-${ONES[ones]}` : tens;
}

function groupToEnglishWords(n: number): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (hundreds > 0) parts.push(`${ONES[hundreds]} hundred`);
  if (rest > 0) parts.push(belowHundredToWords(rest));
  return parts.join(" ");
}

export function numberToEnglishWords(input: string): SpellOutResult {
  const cleaned = input.replace(/\s/g, "").replace(/^0+/, "") || "0";

  if (!/^\d+$/.test(cleaned)) return { error: "invalid" };
  if (cleaned === "0") return { words: "zero" };
  if (cleaned.length > MAX_SPELL_OUT_DIGITS) return { error: "tooLarge" };

  const groups: number[] = [];
  for (let i = cleaned.length; i > 0; i -= 3) {
    groups.unshift(parseInt(cleaned.slice(Math.max(0, i - 3), i), 10));
  }

  const parts: string[] = [];
  groups.forEach((value, index) => {
    if (value === 0) return;
    const scale = SCALES[groups.length - 1 - index];
    const words = groupToEnglishWords(value);
    parts.push(scale ? `${words} ${scale}` : words);
  });

  return { words: parts.join(" ") };
}
