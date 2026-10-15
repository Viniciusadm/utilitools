import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { OptionToggle } from "@/components/option-toggle";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { simulateCompoundInterest } from "@/lib/compound-interest";
import { INTL_LOCALE, useCopy, useLocale, type Localized } from "@/lib/i18n";
import { parseDecimal } from "@/lib/percentage";

const MAX_MONTHS = 1200;

const CURRENCY: Localized<string> = { pt: "BRL", en: "USD" };

const pt = {
  title: "Calculadora de Juros Compostos",
  intro:
    "Simule quanto seu dinheiro rende com juros compostos. Informe o valor inicial, o aporte mensal, a taxa de juros e o prazo para ver o valor final, o total investido, os juros ganhos e a evolução ano a ano.",
  defaultInitial: "1.000",
  initialLabel: "Valor inicial (R$)",
  monthlyLabel: "Aporte mensal (R$)",
  rateLabel: "Taxa de juros (%)",
  ratePeriodLabel: "A taxa é",
  yearly: "Ao ano",
  monthly: "Ao mês",
  periodLabel: "Prazo",
  periodUnitLabel: "Prazo em",
  years: "Anos",
  months: "Meses",
  total: "Valor final",
  invested: "Total investido",
  interest: "Juros ganhos",
  yearColumn: "Ano",
  accumulatedInterest: "Juros acumulados",
  accumulatedTotal: "Valor acumulado",
  invalid: "Confira os valores: use números positivos e um prazo de até 100 anos.",
  content: (
    <>
      <ToolSection title="O que são juros compostos?">
        <p>
          Nos juros compostos, os juros de cada período são somados ao saldo e passam a render juros também. É o famoso
          “juros sobre juros”. Por isso, quanto maior o prazo, mais o dinheiro cresce, e o efeito fica muito mais forte
          nos últimos anos da aplicação.
        </p>
      </ToolSection>

      <ToolSection title="Fórmula dos juros compostos">
        <p>
          Sem aportes, o valor final é <strong>M = C × (1 + i)ⁿ</strong>, em que C é o capital inicial, i é a taxa por
          período e n é o número de períodos. Com aportes mensais, cada depósito rende pelo tempo que fica aplicado, e a
          calculadora soma mês a mês.
        </p>
        <p>
          Para converter uma taxa anual em mensal equivalente, use (1 + taxa anual)^(1/12) − 1. Uma taxa de 12% ao ano
          equivale a cerca de 0,95% ao mês, e não a 1%.
        </p>
      </ToolSection>

      <ToolSection title="Exemplo de juros compostos">
        <p>
          R$ 1.000 aplicados a 1% ao mês, com aportes de R$ 100 por mês, chegam a{" "}
          <strong className="font-mono">R$ 2.395,08</strong> em 12 meses: R$ 2.200 investidos e R$ 195,08 de juros.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">IMPORTANTE:</strong> a simulação não considera impostos, taxas de
          administração nem inflação, e a rentabilidade passada não garante resultados futuros. Ela não é uma
          recomendação de investimento.
        </p>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "Compound Interest Calculator",
  intro:
    "Calculate how your money grows with compound interest. Enter the initial deposit, the monthly contribution, the interest rate and the time period to see the future value, the total invested, the interest earned and a year-by-year breakdown.",
  defaultInitial: "1,000",
  initialLabel: "Initial deposit ($)",
  monthlyLabel: "Monthly contribution ($)",
  rateLabel: "Interest rate (%)",
  ratePeriodLabel: "The rate is",
  yearly: "Per year",
  monthly: "Per month",
  periodLabel: "Time period",
  periodUnitLabel: "Period in",
  years: "Years",
  months: "Months",
  total: "Future value",
  invested: "Total invested",
  interest: "Interest earned",
  yearColumn: "Year",
  accumulatedInterest: "Accumulated interest",
  accumulatedTotal: "Balance",
  invalid: "Check the values: use positive numbers and a period of up to 100 years.",
  content: (
    <>
      <ToolSection title="What is compound interest?">
        <p>
          With compound interest, the interest earned each period is added to the balance and starts earning interest
          too. That is the famous “interest on interest”. The longer the period, the faster your money grows, and the
          effect is much stronger in the final years of the investment.
        </p>
      </ToolSection>

      <ToolSection title="Compound interest formula">
        <p>
          Without contributions, the future value is <strong>A = P × (1 + r)ⁿ</strong>, where P is the principal, r is
          the rate per period and n is the number of periods. With monthly contributions, each deposit earns interest
          for as long as it stays invested, and the calculator compounds month by month.
        </p>
        <p>
          To convert an annual rate into the equivalent monthly rate, use (1 + annual rate)^(1/12) − 1. A 12% annual
          rate is about 0.95% per month, not 1%.
        </p>
      </ToolSection>

      <ToolSection title="Compound interest example">
        <p>
          $1,000 invested at 1% per month, with contributions of $100 per month, grows to{" "}
          <strong className="font-mono">$2,395.08</strong> in 12 months: $2,200 invested and $195.08 in interest.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">IMPORTANT:</strong> this simulation does not account for taxes, fees or
          inflation, and past returns do not guarantee future results. It is not investment advice.
        </p>
      </div>
    </>
  ),
};

export default function CompoundInterest() {
  const copy = useCopy({ pt, en });
  const locale = useLocale();
  const [initial, setInitial] = useState(copy.defaultInitial);
  const [monthly, setMonthly] = useState("200");
  const [rate, setRate] = useState("10");
  const [yearlyRate, setYearlyRate] = useState(true);
  const [period, setPeriod] = useState("10");
  const [periodInYears, setPeriodInYears] = useState(true);

  const currency = useMemo(
    () => new Intl.NumberFormat(INTL_LOCALE[locale], { style: "currency", currency: CURRENCY[locale] }),
    [locale],
  );

  const result = useMemo(() => {
    const values = [initial, monthly, rate, period].map((v) => (v.trim() === "" ? 0 : parseDecimal(v, locale)));
    if (values.some((v) => v === null || v < 0)) return null;
    const [initialValue, monthlyValue, rateValue, periodValue] = values as number[];
    const months = Math.round(periodInYears ? periodValue * 12 : periodValue);
    if (months <= 0 || months > MAX_MONTHS) return null;
    return simulateCompoundInterest({
      initial: initialValue,
      monthlyContribution: monthlyValue,
      ratePercent: rateValue,
      ratePeriod: yearlyRate ? "yearly" : "monthly",
      months,
    });
  }, [initial, monthly, rate, yearlyRate, period, periodInYears, locale]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={copy.initialLabel}>
            {(id) => <Input id={id} inputMode="decimal" value={initial} onChange={(e) => setInitial(e.target.value)} />}
          </Field>
          <Field label={copy.monthlyLabel}>
            {(id) => <Input id={id} inputMode="decimal" value={monthly} onChange={(e) => setMonthly(e.target.value)} />}
          </Field>
          <Field label={copy.rateLabel}>
            {(id) => <Input id={id} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />}
          </Field>
          <OptionToggle
            label={copy.ratePeriodLabel}
            value={yearlyRate}
            onChange={setYearlyRate}
            trueLabel={copy.yearly}
            falseLabel={copy.monthly}
          />
          <Field label={copy.periodLabel}>
            {(id) => <Input id={id} inputMode="decimal" value={period} onChange={(e) => setPeriod(e.target.value)} />}
          </Field>
          <OptionToggle
            label={copy.periodUnitLabel}
            value={periodInYears}
            onChange={setPeriodInYears}
            trueLabel={copy.years}
            falseLabel={copy.months}
          />
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          <dl className="grid gap-3 sm:grid-cols-3">
            {[
              { label: copy.total, value: result.total, highlight: true },
              { label: copy.invested, value: result.invested, highlight: false },
              { label: copy.interest, value: result.interest, highlight: false },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                className={highlight ? "rounded-lg border border-primary/20 bg-primary/5 p-4" : "rounded-lg border border-border bg-card p-4"}
              >
                <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-mono text-xl font-semibold text-foreground">{currency.format(value)}</dd>
              </div>
            ))}
          </dl>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">{copy.yearColumn}</th>
                  <th className="px-4 py-2 text-right font-medium">{copy.invested}</th>
                  <th className="px-4 py-2 text-right font-medium">{copy.accumulatedInterest}</th>
                  <th className="px-4 py-2 text-right font-medium">{copy.accumulatedTotal}</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {result.years.map((row) => (
                  <tr key={row.year} className="border-t border-border">
                    <td className="px-4 py-2 text-foreground">{row.year}</td>
                    <td className="px-4 py-2 text-right text-muted-foreground">{currency.format(row.invested)}</td>
                    <td className="px-4 py-2 text-right text-muted-foreground">{currency.format(row.interest)}</td>
                    <td className="px-4 py-2 text-right font-semibold text-foreground">{currency.format(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-sm text-destructive">{copy.invalid}</p>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="calculadora-de-juros-compostos" />
        <RelatedTools ids={["calculadora-de-porcentagem", "gerador-de-qr-code-pix", "calcular-tres", "calcular-dias-uteis"]} />
      </div>
    </div>
  );
}
