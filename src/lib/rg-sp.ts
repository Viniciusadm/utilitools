// RG SSP SP generator
// 8 random digits + 1 check digit (mod 11, remainder 0 or 1 → X)

export function generateRGSP(formatted = true): string {
  const digits: number[] = [];
  for (let i = 0; i < 8; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  const weights = [2, 3, 4, 5, 6, 7, 8, 9];
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += digits[7 - i] * weights[i];
  }
  const remainder = sum % 11;
  const checkStr = remainder < 2 ? "0" : String(11 - remainder);
  // Some implementations use X for 10, but SSP SP typically wraps to 0

  const raw = digits.join("") + checkStr;

  if (!formatted) return raw;

  // Format: 00.000.000-0
  return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}-${raw.slice(8)}`;
}
