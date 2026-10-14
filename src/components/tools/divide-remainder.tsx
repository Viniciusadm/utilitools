
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DivideRemainder() {
  const [dividend, setDividend] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<{
    quotient: number;
    remainder: number;
    remainderPercent: string;
  } | null>(null);

  const handleCalculate = () => {
    const a = Number(dividend);
    const b = Number(divisor);
    if (!b) return;
    const quotient = Math.trunc(a / b);
    const remainder = a % b;
    const remainderPercent = a !== 0 ? ((remainder / a) * 100).toFixed(2) : "0.00";
    setResult({ quotient, remainder, remainderPercent });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calculadora de Resto</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Calculadora de resto de divisão. Você pode informar o dividendo e o divisor para obter o resultado da divisão.
          Basta preencher os valores, clicar em calcular e você verá o quociente, o resto da divisão e a porcentagem do resto em relação ao dividendo.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Dividendo</Label>
          <Input
            type="number"
            value={dividend}
            onChange={(e) => setDividend(e.target.value)}
           
            placeholder="Ex: 10"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Divisor</Label>
          <Input
            type="number"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
           
            placeholder="Ex: 3"
          />
        </div>
      </div>

      <Button onClick={handleCalculate} className="px-8">Calcular</Button>

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
            <p className="text-sm font-medium text-muted-foreground">Resultado</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">Quociente</p>
                <p className="text-lg font-semibold font-mono text-foreground">{result.quotient}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Resto</p>
                <p className="text-lg font-semibold font-mono text-foreground">{result.remainder}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Porcentagem do resto</p>
                <p className="text-lg font-semibold font-mono text-foreground">{result.remainderPercent}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
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

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/calcular-tres" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Calcular Três</a>
          </div>
        </section>
      </div>
    </div>
  );
}
