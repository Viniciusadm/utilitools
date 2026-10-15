import { addDays, format, isWeekend, startOfDay } from "date-fns";

export type HolidayCode =
  | "newYear"
  | "tiradentes"
  | "labourDay"
  | "independence"
  | "ourLadyAparecida"
  | "allSouls"
  | "republic"
  | "blackConsciousness"
  | "christmas"
  | "goodFriday"
  | "carnivalMonday"
  | "carnivalTuesday"
  | "corpusChristi";

export type Holiday = {
  date: Date;
  code: HolidayCode;
  optional: boolean;
};

const ISO = "yyyy-MM-dd";

const FIXED_HOLIDAYS: { month: number; day: number; code: HolidayCode }[] = [
  { month: 0, day: 1, code: "newYear" },
  { month: 3, day: 21, code: "tiradentes" },
  { month: 4, day: 1, code: "labourDay" },
  { month: 8, day: 7, code: "independence" },
  { month: 9, day: 12, code: "ourLadyAparecida" },
  { month: 10, day: 2, code: "allSouls" },
  { month: 10, day: 15, code: "republic" },
  { month: 11, day: 25, code: "christmas" },
];

const BLACK_CONSCIOUSNESS_DAY_SINCE = 2024;

export function easterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

export function nationalHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  const holidays: Holiday[] = FIXED_HOLIDAYS.map(({ month, day, code }) => ({
    date: new Date(year, month, day),
    code,
    optional: false,
  }));
  if (year >= BLACK_CONSCIOUSNESS_DAY_SINCE) {
    holidays.push({ date: new Date(year, 10, 20), code: "blackConsciousness", optional: false });
  }
  holidays.push(
    { date: addDays(easter, -2), code: "goodFriday", optional: false },
    { date: addDays(easter, -48), code: "carnivalMonday", optional: true },
    { date: addDays(easter, -47), code: "carnivalTuesday", optional: true },
    { date: addDays(easter, 60), code: "corpusChristi", optional: true },
  );
  return holidays.sort((x, y) => x.date.getTime() - y.date.getTime());
}

function holidayCalendar(includeOptional: boolean) {
  const cache = new Map<number, Map<string, Holiday>>();

  const holidaysOf = (year: number) => {
    let byDate = cache.get(year);
    if (!byDate) {
      byDate = new Map(
        nationalHolidays(year)
          .filter((holiday) => includeOptional || !holiday.optional)
          .map((holiday) => [format(holiday.date, ISO), holiday]),
      );
      cache.set(year, byDate);
    }
    return byDate;
  };

  const holidayOn = (date: Date) => holidaysOf(date.getFullYear()).get(format(date, ISO));

  return {
    holidayOn,
    isBusinessDay: (date: Date) => !isWeekend(date) && !holidayOn(date),
  };
}

export type BusinessDaysCount = {
  businessDays: number;
  calendarDays: number;
  weekendDays: number;
  holidays: Holiday[];
};

export function countBusinessDays(start: Date, end: Date, includeOptional: boolean): BusinessDaysCount {
  const calendar = holidayCalendar(includeOptional);
  const [from, to] = start <= end ? [startOfDay(start), startOfDay(end)] : [startOfDay(end), startOfDay(start)];
  const result: BusinessDaysCount = { businessDays: 0, calendarDays: 0, weekendDays: 0, holidays: [] };

  for (let day = from; day <= to; day = addDays(day, 1)) {
    result.calendarDays++;
    if (isWeekend(day)) {
      result.weekendDays++;
      continue;
    }
    const holiday = calendar.holidayOn(day);
    if (holiday) result.holidays.push(holiday);
    else result.businessDays++;
  }

  return result;
}

export function addBusinessDays(start: Date, amount: number, includeOptional: boolean) {
  const calendar = holidayCalendar(includeOptional);
  const step = amount >= 0 ? 1 : -1;
  let remaining = Math.abs(amount);
  let day = startOfDay(start);
  while (remaining > 0) {
    day = addDays(day, step);
    if (calendar.isBusinessDay(day)) remaining--;
  }
  return day;
}
