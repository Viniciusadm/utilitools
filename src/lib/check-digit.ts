export function randomDigits(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10));
}

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function weightedSum(digits: readonly number[], weights: readonly number[]) {
  return digits.reduce((sum, digit, i) => sum + digit * weights[i], 0);
}

export function mod11CheckDigit(digits: readonly number[], weights: readonly number[]) {
  const remainder = weightedSum(digits, weights) % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function hasAllSameDigits(digits: string) {
  return /^(\d)\1*$/.test(digits);
}
