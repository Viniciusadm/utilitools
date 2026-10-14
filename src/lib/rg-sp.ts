// RG SSP SP generator
// 8 random digits + 1 check digit (mod 11, remainder 0 or 1 → X)

const WEIGHTS = [2, 3, 4, 5, 6, 7, 8, 9];

export function rgSpCheckDigit(baseDigits: readonly number[]): string {
  const sum = baseDigits.reduce((total, digit, i) => total + digit * WEIGHTS[i], 0);
  const check = 11 - (sum % 11);
  if (check === 11) return "0";
  if (check === 10) return "X";
  return String(check);
}

export function isValidRGSP(value: string): boolean {
  const normalized = value.replace(/[^\dXx]/g, "").toUpperCase();
  if (!/^\d{8}[\dX]$/.test(normalized)) return false;
  if (/^(\d)\1{8}$/.test(normalized)) return false;
  const baseDigits = normalized.slice(0, 8).split("").map(Number);
  return rgSpCheckDigit(baseDigits) === normalized[8];
}

export function generateRGSP(formatted = true): string {
  const digits: number[] = [];
  for (let i = 0; i < 8; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  const checkStr = rgSpCheckDigit(digits);

  const raw = digits.join("") + checkStr;

  if (!formatted) return raw;

  // Format: 00.000.000-0
  return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}-${raw.slice(8)}`;
}
