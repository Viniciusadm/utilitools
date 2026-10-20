export type TimestampUnit = "seconds" | "milliseconds";

export function parseTimestamp(value: string): { date: Date; unit: TimestampUnit } | null {
  const trimmed = value.trim();
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) return null;
  const number = Number(trimmed);
  const unit: TimestampUnit = trimmed.replace(/^-/, "").split(".")[0].length >= 12 ? "milliseconds" : "seconds";
  const date = new Date(unit === "seconds" ? number * 1000 : number);
  return Number.isNaN(date.getTime()) ? null : { date, unit };
}

export function toUnixSeconds(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export function relativeTime(date: Date, now: Date, locale: string) {
  const seconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
    ["second", 1],
  ];
  const [unit, size] = units.find(([, size]) => Math.abs(seconds) >= size) ?? ["second", 1];
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(Math.round(seconds / size), unit);
}
