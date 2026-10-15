import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { INTL_LOCALE, useCopy, useLocale } from "@/lib/i18n";

const pt = {
  title: "Calculadora de Resto",
  intro:
    "Calculadora de resto de divisão. Você pode informar o dividendo e o divisor para obter o resultado da divisão. Basta preencher os valores, clicar em calcular e você verá o quociente, o resto da divisão e a porcentagem do resto em relação ao dividendo.",
  dividend: "Dividendo",
  divisor: "Divisor",
  dividendPlaceholder: "Ex: 10",
  divisorPlaceholder: "Ex: 3",
  calculate: "Calcular",
  result: "Resultado",
  quotient: "Quociente",
  remainder: "Resto",
  remainderPercent: "Porcentagem do resto",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é divisão?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A divisão é uma operação matemática que serve para descobrir quantas vezes um número cabe dentro de outro. O número que será dividido é chamado de dividendo, e o número pelo qual ele será dividido é chamado de divisor.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a divisão?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Ao dividir um número por outro, obtemos um resultado chamado quociente, que indica quantas vezes o divisor cabe no dividendo. Em alguns casos, a divisão não é exata, gerando um valor restante chamado resto.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Exemplo de divisão</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Por exemplo, ao dividir 10 por 3: 10 ÷ 3 = 3 com resto 1. Isso significa que o número 3 cabe três vezes dentro de 10, sobrando 1. O quociente é 3 e o resto é 1.
        </p>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "Remainder Calculator",
  intro:
    "Division remainder calculator. Enter the dividend and the divisor to get the result of the division. Fill in the values, click Calculate and you will see the quotient, the remainder and the remainder as a percentage of the dividend.",
  dividend: "Dividend",
  divisor: "Divisor",
  dividendPlaceholder: "e.g. 10",
  divisorPlaceholder: "e.g. 3",
  calculate: "Calculate",
  result: "Result",
  quotient: "Quotient",
  remainder: "Remainder",
  remainderPercent: "Remainder percentage",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is division?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Division is a math operation that tells you how many times one number fits into another. The number being divided is called the dividend, and the number you divide by is called the divisor.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How does division with remainder work?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          When you divide one number by another, the result is called the quotient, which shows how many whole times the divisor fits into the dividend. When the division is not exact, the amount left over is called the remainder.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Division example</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          For example, dividing 10 by 3: 10 ÷ 3 = 3 remainder 1. This means 3 fits into 10 three times, with 1 left over. The quotient is 3 and the remainder is 1.
        </p>
      </section>
    </>
  ),
};

type DivisionResult = {
  quotient: number;
  remainder: number;
  remainderPercent: number;
};

export default function DivideRemainder() {
  const locale = useLocale();
  const copy = useCopy({ pt, en });
  const [dividend, setDividend] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<DivisionResult | null>(null);

  const numberFormat = new Intl.NumberFormat(INTL_LOCALE[locale], { maximumFractionDigits: 6 });
  const percentFormat = new Intl.NumberFormat(INTL_LOCALE[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleCalculate = () => {
    const a = Number(dividend);
    const b = Number(divisor);
    if (!b) return;
    const quotient = Math.trunc(a / b);
    const remainder = a % b;
    const remainderPercent = a !== 0 ? (remainder / a) * 100 : 0;
    setResult({ quotient, remainder, remainderPercent });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.dividend}</Label>
          <Input
            type="number"
            value={dividend}
            onChange={(e) => setDividend(e.target.value)}
            placeholder={copy.dividendPlaceholder}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.divisor}</Label>
          <Input
            type="number"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
            placeholder={copy.divisorPlaceholder}
          />
        </div>
      </div>

      <Button onClick={handleCalculate} className="px-8">{copy.calculate}</Button>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={`${result.quotient}-${result.remainder}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3"
          >
            <p className="text-sm font-medium text-muted-foreground">{copy.result}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">{copy.quotient}</p>
                <p className="text-lg font-semibold font-mono text-foreground">{numberFormat.format(result.quotient)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{copy.remainder}</p>
                <p className="text-lg font-semibold font-mono text-foreground">{numberFormat.format(result.remainder)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{copy.remainderPercent}</p>
                <p className="text-lg font-semibold font-mono text-foreground">{percentFormat.format(result.remainderPercent)}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="calcular-resto" />

        <RelatedTools ids={["calcular-tres"]} />
      </div>
    </div>
  );
}
