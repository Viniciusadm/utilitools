export function parseDecimal(value: string) {
  const usesThousandsDots = /^\s*-?\d{1,3}(\.\d{3})+\s*$/.test(value);
  const normalized = value.includes(",") || usesThousandsDots ? value.replace(/\./g, "").replace(",", ".") : value;
  const trimmed = normalized.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

const numberFormat = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 });

export function formatDecimal(value: number) {
  return numberFormat.format(value);
}

export const percentOf = (percent: number, total: number) => (percent / 100) * total;

export const percentageRatio = (part: number, total: number) => (total === 0 ? null : (part / total) * 100);

export const applyIncrease = (value: number, percent: number) => value * (1 + percent / 100);

export const applyDiscount = (value: number, percent: number) => value * (1 - percent / 100);

export const percentChange = (from: number, to: number) => (from === 0 ? null : ((to - from) / Math.abs(from)) * 100);
