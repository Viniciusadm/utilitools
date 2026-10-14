export type RatePeriod = "monthly" | "yearly";

export type CompoundInterestInput = {
  initial: number;
  monthlyContribution: number;
  ratePercent: number;
  ratePeriod: RatePeriod;
  months: number;
};

export type YearSummary = {
  year: number;
  invested: number;
  interest: number;
  total: number;
};

export type CompoundInterestResult = {
  invested: number;
  interest: number;
  total: number;
  years: YearSummary[];
};

export function monthlyRate(ratePercent: number, ratePeriod: RatePeriod) {
  const rate = ratePercent / 100;
  return ratePeriod === "monthly" ? rate : Math.pow(1 + rate, 1 / 12) - 1;
}

export function simulateCompoundInterest({
  initial,
  monthlyContribution,
  ratePercent,
  ratePeriod,
  months,
}: CompoundInterestInput): CompoundInterestResult {
  const rate = monthlyRate(ratePercent, ratePeriod);
  let total = initial;
  let invested = initial;
  const years: YearSummary[] = [];

  for (let month = 1; month <= months; month++) {
    total = total * (1 + rate) + monthlyContribution;
    invested += monthlyContribution;
    if (month % 12 === 0 || month === months) {
      years.push({ year: Math.ceil(month / 12), invested, interest: total - invested, total });
    }
  }

  return { invested, interest: total - invested, total, years };
}
