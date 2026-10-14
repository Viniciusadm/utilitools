import { hasAllSameDigits, mod11CheckDigit, onlyDigits, randomDigits } from "@/lib/check-digit";

const WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export function formatPIS(value: string) {
  const pis = onlyDigits(value);
  return `${pis.slice(0, 3)}.${pis.slice(3, 8)}.${pis.slice(8, 10)}-${pis.slice(10)}`;
}

export function generatePIS(formatted = true) {
  const base = randomDigits(10);
  const raw = `${base.join("")}${mod11CheckDigit(base, WEIGHTS)}`;
  return formatted ? formatPIS(raw) : raw;
}

export function isValidPIS(value: string) {
  const pis = onlyDigits(value);
  if (pis.length !== 11 || hasAllSameDigits(pis)) return false;
  const digits = pis.split("").map(Number);
  return mod11CheckDigit(digits.slice(0, 10), WEIGHTS) === digits[10];
}
