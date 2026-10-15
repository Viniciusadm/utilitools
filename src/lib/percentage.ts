import { INTL_LOCALE, type Locale } from "@/lib/i18n";

const THOUSANDS_SEPARATOR: Record<Locale, string> = { pt: ".", en: "," };

function normalizeDecimal(value: string, locale: Locale) {
  const thousands = THOUSANDS_SEPARATOR[locale];
  const decimal = thousands === "." ? "," : ".";
  const escaped = `\\${thousands}`;
  const usesThousands = new RegExp(`^\\s*-?\\d{1,3}(${escaped}\\d{3})+(${`\\${decimal}`}\\d+)?\\s*$`).test(value);
  if (usesThousands) return value.split(thousands).join("").replace(decimal, ".");
  return value.replace(",", ".");
}

export function parseDecimal(value: string, locale: Locale) {
  const trimmed = normalizeDecimal(value, locale).trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatDecimal(value: number, locale: Locale) {
  return new Intl.NumberFormat(INTL_LOCALE[locale], { maximumFractionDigits: 4 }).format(value);
}

export const percentOf = (percent: number, total: number) => (percent / 100) * total;

export const percentageRatio = (part: number, total: number) => (total === 0 ? null : (part / total) * 100);

export const applyIncrease = (value: number, percent: number) => value * (1 + percent / 100);

export const applyDiscount = (value: number, percent: number) => value * (1 - percent / 100);

export const percentChange = (from: number, to: number) => (from === 0 ? null : ((to - from) / Math.abs(from)) * 100);
