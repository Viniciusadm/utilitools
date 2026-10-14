import { hasAllSameDigits, onlyDigits, randomDigits, weightedSum } from "@/lib/check-digit";

const WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function renavamCheckDigit(base: readonly number[]) {
  const check = (weightedSum(base, WEIGHTS) * 10) % 11;
  return check === 10 ? 0 : check;
}

export function generateRENAVAM() {
  const base = randomDigits(10);
  return `${base.join("")}${renavamCheckDigit(base)}`;
}

export function isValidRENAVAM(value: string) {
  const renavam = onlyDigits(value).padStart(11, "0");
  if (renavam.length !== 11 || hasAllSameDigits(renavam)) return false;
  const digits = renavam.split("").map(Number);
  return renavamCheckDigit(digits.slice(0, 10)) === digits[10];
}
