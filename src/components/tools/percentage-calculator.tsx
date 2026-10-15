import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useCopy, useLocale, type Locale } from "@/lib/i18n";
import {
  applyDiscount,
  applyIncrease,
  formatDecimal,
  parseDecimal,
  percentChange,
  percentOf,
  percentageRatio,
} from "@/lib/percentage";

type Field = { prefix?: string; suffix?: string; value: string; onChange: (value: string) => void; label: string };

function InlineInput({ value, onChange, label }: Pick<Field, "value" | "onChange" | "label">) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="inline-flex h-10 w-28 text-center font-mono"
      />
    </>
  );
}

function CalculatorCard({
  title,
  fields,
  result,
}: {
  title: string;
  fields: readonly Field[];
  result: string | null;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="flex flex-wrap items-center gap-2 text-[15px] text-muted-foreground">
        {fields.map((field) => (
          <span key={field.label} className="inline-flex items-center gap-2">
            {field.prefix && <span>{field.prefix}</span>}
            <InlineInput value={field.value} onChange={field.onChange} label={field.label} />
            {field.suffix && <span>{field.suffix}</span>}
          </span>
        ))}
        <span>=</span>
        <output className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 font-mono text-lg font-semibold text-foreground">
          {result ?? "—"}
        </output>
      </div>
    </div>
  );
}

function compute(
  [first, second]: [string, string],
  fn: (a: number, b: number) => number | null,
  locale: Locale,
  suffix = "",
) {
  const a = parseDecimal(first, locale);
  const b = parseDecimal(second, locale);
  if (a === null || b === null) return null;
  const result = fn(a, b);
  return result === null ? null : `${formatDecimal(result, locale)}${suffix}`;
}

const pt = {
  title: "Calculadora de Porcentagem",
  intro:
    "Calcule porcentagens online de forma rápida: descubra quanto é X% de um valor, quantos por cento um número representa de outro, aplique aumentos e descontos e veja a variação percentual entre dois valores. O resultado aparece enquanto você digita.",
  percentOf: {
    title: "Quanto é X% de um valor?",
    percentSuffix: "% de",
    percentLabel: "Porcentagem",
    totalLabel: "Valor total",
  },
  ratio: {
    title: "Um valor é quantos % de outro?",
    partSuffix: "é quantos % de",
    partLabel: "Parte",
    totalLabel: "Total",
  },
  increase: {
    title: "Aumento percentual",
    valueSuffix: "com aumento de",
    valueLabel: "Valor inicial",
    percentLabel: "Porcentagem de aumento",
  },
  discount: {
    title: "Desconto percentual",
    valueSuffix: "com desconto de",
    valueLabel: "Valor inicial",
    percentLabel: "Porcentagem de desconto",
  },
  change: {
    title: "Variação percentual entre dois valores",
    fromPrefix: "De",
    fromLabel: "Valor inicial",
    toPrefix: "para",
    toLabel: "Valor final",
  },
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é porcentagem?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Porcentagem é uma razão de base 100, representada pelo símbolo %. Dizer 25% é o mesmo que dizer 25 partes
          de 100, ou seja, 0,25. Ela é usada no dia a dia para calcular descontos, juros, impostos, gorjetas,
          comissões, notas e variações de preço.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Fórmulas de porcentagem</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>
            <strong className="text-foreground">X% de Y:</strong> Y × X ÷ 100
          </li>
          <li>
            <strong className="text-foreground">X é quantos % de Y:</strong> X ÷ Y × 100
          </li>
          <li>
            <strong className="text-foreground">Aumento de X%:</strong> valor × (1 + X ÷ 100)
          </li>
          <li>
            <strong className="text-foreground">Desconto de X%:</strong> valor × (1 − X ÷ 100)
          </li>
          <li>
            <strong className="text-foreground">Variação percentual:</strong> (final − inicial) ÷ inicial × 100
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Exemplos de cálculo de porcentagem</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>
            10% de R$ 350 é <strong className="text-foreground font-mono">R$ 35</strong>.
          </li>
          <li>
            Uma conta de R$ 120 com 10% de serviço fica em <strong className="text-foreground font-mono">R$ 132</strong>.
          </li>
          <li>
            Um salário que passou de R$ 2.000 para R$ 2.150 teve aumento de{" "}
            <strong className="text-foreground font-mono">7,5%</strong>.
          </li>
        </ul>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">DICA:</strong> um aumento de 10% seguido de um desconto de 10% não volta
          ao valor original. R$ 100 + 10% = R$ 110, e R$ 110 − 10% = R$ 99.
        </p>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "Percentage Calculator",
  intro:
    "Calculate percentages online in seconds: find X% of a number, what percent one number is of another, apply increases and discounts, and get the percentage change between two values. Results update as you type.",
  percentOf: {
    title: "What is X% of a number?",
    percentSuffix: "% of",
    percentLabel: "Percentage",
    totalLabel: "Total value",
  },
  ratio: {
    title: "X is what percent of Y?",
    partSuffix: "is what % of",
    partLabel: "Part",
    totalLabel: "Total",
  },
  increase: {
    title: "Percentage increase",
    valueSuffix: "increased by",
    valueLabel: "Initial value",
    percentLabel: "Increase percentage",
  },
  discount: {
    title: "Percentage discount",
    valueSuffix: "discounted by",
    valueLabel: "Initial value",
    percentLabel: "Discount percentage",
  },
  change: {
    title: "Percentage change between two values",
    fromPrefix: "From",
    fromLabel: "Initial value",
    toPrefix: "to",
    toLabel: "Final value",
  },
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is a percentage?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A percentage is a ratio expressed out of 100, written with the % sign. Saying 25% is the same as saying 25
          parts out of 100, or 0.25. Percentages are used every day to work out discounts, interest, taxes, tips,
          commissions, grades and price changes.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Percentage formulas</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>
            <strong className="text-foreground">X% of Y:</strong> Y × X ÷ 100
          </li>
          <li>
            <strong className="text-foreground">X is what % of Y:</strong> X ÷ Y × 100
          </li>
          <li>
            <strong className="text-foreground">Increase by X%:</strong> value × (1 + X ÷ 100)
          </li>
          <li>
            <strong className="text-foreground">Discount of X%:</strong> value × (1 − X ÷ 100)
          </li>
          <li>
            <strong className="text-foreground">Percentage change:</strong> (final − initial) ÷ initial × 100
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Percentage calculation examples</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>
            10% of $350 is <strong className="text-foreground font-mono">$35</strong>.
          </li>
          <li>
            A $120 bill with a 10% tip comes to <strong className="text-foreground font-mono">$132</strong>.
          </li>
          <li>
            A salary that went from $2,000 to $2,150 increased by{" "}
            <strong className="text-foreground font-mono">7.5%</strong>.
          </li>
        </ul>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">TIP:</strong> a 10% increase followed by a 10% discount does not bring
          you back to the original value. $100 + 10% = $110, and $110 − 10% = $99.
        </p>
      </div>
    </>
  ),
};

export default function PercentageCalculator() {
  const locale = useLocale();
  const copy = useCopy({ pt, en });
  const [ofPercent, setOfPercent] = useState("15");
  const [ofTotal, setOfTotal] = useState("200");
  const [ratioPart, setRatioPart] = useState("30");
  const [ratioTotal, setRatioTotal] = useState("120");
  const [increaseValue, setIncreaseValue] = useState("50");
  const [increasePercent, setIncreasePercent] = useState("10");
  const [discountValue, setDiscountValue] = useState("80");
  const [discountPercent, setDiscountPercent] = useState("25");
  const [changeFrom, setChangeFrom] = useState("50");
  const [changeTo, setChangeTo] = useState("65");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-4">
        <CalculatorCard
          title={copy.percentOf.title}
          fields={[
            { value: ofPercent, onChange: setOfPercent, suffix: copy.percentOf.percentSuffix, label: copy.percentOf.percentLabel },
            { value: ofTotal, onChange: setOfTotal, label: copy.percentOf.totalLabel },
          ]}
          result={compute([ofPercent, ofTotal], percentOf, locale)}
        />
        <CalculatorCard
          title={copy.ratio.title}
          fields={[
            { value: ratioPart, onChange: setRatioPart, suffix: copy.ratio.partSuffix, label: copy.ratio.partLabel },
            { value: ratioTotal, onChange: setRatioTotal, label: copy.ratio.totalLabel },
          ]}
          result={compute([ratioPart, ratioTotal], percentageRatio, locale, "%")}
        />
        <CalculatorCard
          title={copy.increase.title}
          fields={[
            { value: increaseValue, onChange: setIncreaseValue, suffix: copy.increase.valueSuffix, label: copy.increase.valueLabel },
            { value: increasePercent, onChange: setIncreasePercent, suffix: "%", label: copy.increase.percentLabel },
          ]}
          result={compute([increaseValue, increasePercent], applyIncrease, locale)}
        />
        <CalculatorCard
          title={copy.discount.title}
          fields={[
            { value: discountValue, onChange: setDiscountValue, suffix: copy.discount.valueSuffix, label: copy.discount.valueLabel },
            { value: discountPercent, onChange: setDiscountPercent, suffix: "%", label: copy.discount.percentLabel },
          ]}
          result={compute([discountValue, discountPercent], applyDiscount, locale)}
        />
        <CalculatorCard
          title={copy.change.title}
          fields={[
            { value: changeFrom, onChange: setChangeFrom, prefix: copy.change.fromPrefix, label: copy.change.fromLabel },
            { value: changeTo, onChange: setChangeTo, prefix: copy.change.toPrefix, label: copy.change.toLabel },
          ]}
          result={compute([changeFrom, changeTo], percentChange, locale, "%")}
        />
      </div>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="calculadora-de-porcentagem" />

        <RelatedTools ids={["calcular-tres", "calcular-resto", "numeros-por-extenso", "calcular-idade"]} />
      </div>
    </div>
  );
}
