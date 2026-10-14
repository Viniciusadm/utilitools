import { addMonths, addYears, differenceInCalendarDays, differenceInMonths, startOfDay } from "date-fns";

export type Age = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  daysUntilBirthday: number;
};

function wholeMonthsBetween(start: Date, end: Date) {
  let months = differenceInMonths(end, start);
  while (months > 0 && addMonths(start, months) > end) months--;
  while (addMonths(start, months + 1) <= end) months++;
  return months;
}

function nextBirthday(birth: Date, today: Date) {
  const yearsSinceBirth = today.getFullYear() - birth.getFullYear();
  const birthdayThisYear = addYears(birth, yearsSinceBirth);
  return birthdayThisYear < today ? addYears(birth, yearsSinceBirth + 1) : birthdayThisYear;
}

export function calculateAge(birthDate: Date, referenceDate: Date): Age | null {
  const birth = startOfDay(birthDate);
  const today = startOfDay(referenceDate);
  if (birth > today) return null;

  const totalMonths = wholeMonthsBetween(birth, today);
  const totalDays = differenceInCalendarDays(today, birth);

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days: differenceInCalendarDays(today, addMonths(birth, totalMonths)),
    totalMonths,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    daysUntilBirthday: differenceInCalendarDays(nextBirthday(birth, today), today),
  };
}
