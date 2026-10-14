const WEIGHTS_FIRST = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_SECOND = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ASCII_ZERO = 48;

function checkDigit(chars: string, weights: readonly number[]) {
  const sum = weights.reduce((acc, weight, i) => acc + (chars.charCodeAt(i) - ASCII_ZERO) * weight, 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function cnpjCheckDigits(base: string) {
  const first = checkDigit(base, WEIGHTS_FIRST);
  const second = checkDigit(`${base}${first}`, WEIGHTS_SECOND);
  return `${first}${second}`;
}

export function normalizeCNPJ(value: string) {
  return value.toUpperCase().replace(/[^0-9A-Z]/g, "");
}

export function isAlphanumericCNPJ(value: string) {
  return /[A-Z]/.test(normalizeCNPJ(value));
}

export function isValidCNPJ(value: string) {
  const cnpj = normalizeCNPJ(value);
  if (!/^[0-9A-Z]{12}\d{2}$/.test(cnpj)) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  return cnpjCheckDigits(cnpj.slice(0, 12)) === cnpj.slice(12);
}

export function formatCNPJ(value: string) {
  const cnpj = normalizeCNPJ(value);
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
}

function randomNumericBase() {
  const root = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
  // filial: 0001
  return `${root}0001`;
}

function randomAlphanumericBase() {
  const pick = (charset: string) => charset[Math.floor(Math.random() * charset.length)];
  const base = Array.from({ length: 12 }, () => pick(ALPHANUMERIC));
  if (!base.some((char) => /[A-Z]/.test(char))) {
    base[Math.floor(Math.random() * base.length)] = pick(ALPHANUMERIC.slice(10));
  }
  return base.join("");
}

export function generateCNPJ(formatted = true, alphanumeric = false): string {
  const base = alphanumeric ? randomAlphanumericBase() : randomNumericBase();
  const raw = `${base}${cnpjCheckDigits(base)}`;
  return formatted ? formatCNPJ(raw) : raw;
}
