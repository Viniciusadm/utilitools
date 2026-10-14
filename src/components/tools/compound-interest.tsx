import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { OptionToggle } from "@/components/option-toggle";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { simulateCompoundInterest } from "@/lib/compound-interest";
import { parseDecimal } from "@/lib/percentage";

const MAX_MONTHS = 1200;

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function CompoundInterest() {
  const [initial, setInitial] = useState("1.000");
  const [monthly, setMonthly] = useState("200");
  const [rate, setRate] = useState("10");
  const [yearlyRate, setYearlyRate] = useState(true);
  const [period, setPeriod] = useState("10");
  const [periodInYears, setPeriodInYears] = useState(true);

  const result = useMemo(() => {
    const values = [initial, monthly, rate, period].map((v) => (v.trim() === "" ? 0 : parseDecimal(v)));
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
  }, [initial, monthly, rate, yearlyRate, period, periodInYears]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calculadora de Juros Compostos</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Simule quanto seu dinheiro rende com juros compostos. Informe o valor inicial, o aporte mensal, a taxa de juros e
          o prazo para ver o valor final, o total investido, os juros ganhos e a evolução ano a ano.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Valor inicial (R$)">
            {(id) => <Input id={id} inputMode="decimal" value={initial} onChange={(e) => setInitial(e.target.value)} />}
          </Field>
          <Field label="Aporte mensal (R$)">
            {(id) => <Input id={id} inputMode="decimal" value={monthly} onChange={(e) => setMonthly(e.target.value)} />}
          </Field>
          <Field label="Taxa de juros (%)">
            {(id) => <Input id={id} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />}
          </Field>
          <OptionToggle label="A taxa é" value={yearlyRate} onChange={setYearlyRate} trueLabel="Ao ano" falseLabel="Ao mês" />
          <Field label="Prazo">
            {(id) => <Input id={id} inputMode="decimal" value={period} onChange={(e) => setPeriod(e.target.value)} />}
          </Field>
          <OptionToggle label="Prazo em" value={periodInYears} onChange={setPeriodInYears} trueLabel="Anos" falseLabel="Meses" />
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          <dl className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Valor final", value: result.total, highlight: true },
              { label: "Total investido", value: result.invested, highlight: false },
              { label: "Juros ganhos", value: result.interest, highlight: false },
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
                  <th className="px-4 py-2 text-left font-medium">Ano</th>
                  <th className="px-4 py-2 text-right font-medium">Total investido</th>
                  <th className="px-4 py-2 text-right font-medium">Juros acumulados</th>
                  <th className="px-4 py-2 text-right font-medium">Valor acumulado</th>
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
        <p className="text-sm text-destructive">Confira os valores: use números positivos e um prazo de até 100 anos.</p>
      )}

      <div className="space-y-8 border-t border-border pt-10">
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

        <ToolFaq segment="calculadora-de-juros-compostos" />
        <RelatedTools segments={["calculadora-de-porcentagem", "gerador-de-qr-code-pix", "calcular-tres", "calcular-dias-uteis"]} />
      </div>
    </div>
  );
}
