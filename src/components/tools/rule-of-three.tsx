import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useUiCopy } from "@/i18n/ui";
import { INTL_LOCALE, useCopy, useLocale } from "@/lib/i18n";

const pt = {
  title: "Calculadora de Regra de Três",
  intro:
    "Calculadora de regra de três simples online. Você pode informar três valores para descobrir o quarto valor proporcional de forma rápida. Basta preencher os campos e o cálculo será feito automaticamente, mostrando o resultado da regra de três.",
  valueA: "Valor A",
  valueB: "Valor B",
  valueC: "Valor C",
  resultX: "Resultado (X)",
  placeholderA: "Ex: 10",
  placeholderB: "Ex: 20",
  placeholderC: "Ex: 30",
  copyResult: "Copiar resultado",
  resultTitle: "Resultado da Regra de Três",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é regra de três?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A regra de três simples é um método matemático utilizado para encontrar um valor desconhecido com base em uma relação de proporção entre outros valores. Ela é muito utilizada no dia a dia, em situações como cálculos de preços, porcentagens, medidas e tempo.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a regra de três?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Quando duas grandezas são proporcionais, podemos montar uma relação entre elas para descobrir um valor desconhecido. Na prática, usamos três valores conhecidos para encontrar o quarto valor proporcional.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como calcular regra de três</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Identifique os valores conhecidos</strong> — Você terá três valores (A, B e C) e um valor desconhecido (X).</li>
          <li><strong className="text-foreground">Monte a proporção</strong> — B está para A assim como C está para X.</li>
          <li><strong className="text-foreground">Multiplique em cruz</strong> — Multiplique A por C.</li>
          <li><strong className="text-foreground">Divida pelo valor restante</strong> — Divida o resultado por B para encontrar X.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Exemplo de regra de três</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Se temos a relação: B está para A assim como C está para X. Então: X = (A × C) ÷ B. Isso permite descobrir o valor proporcional de forma simples e rápida.
        </p>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "Rule of Three Calculator",
  intro:
    "Online rule of three calculator for simple proportions. Enter three values to quickly find the fourth proportional value. Just fill in the fields and the calculation runs automatically, showing the result of the rule of three.",
  valueA: "Value A",
  valueB: "Value B",
  valueC: "Value C",
  resultX: "Result (X)",
  placeholderA: "e.g. 10",
  placeholderB: "e.g. 20",
  placeholderC: "e.g. 30",
  copyResult: "Copy result",
  resultTitle: "Rule of Three Result",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is the rule of three?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The simple rule of three is a math method used to find an unknown value from a proportional relationship between other values. It is widely used in everyday situations such as working out prices, percentages, measurements and time.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How does the rule of three work?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          When two quantities are proportional, you can set up a relationship between them to find an unknown value. In practice, you use three known values to find the fourth proportional value.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to solve a rule of three</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Identify the known values</strong> — You have three values (A, B and C) and one unknown value (X).</li>
          <li><strong className="text-foreground">Set up the proportion</strong> — B corresponds to A just as C corresponds to X, so A ÷ B = X ÷ C.</li>
          <li><strong className="text-foreground">Cross-multiply</strong> — Multiply A by C.</li>
          <li><strong className="text-foreground">Divide by the remaining value</strong> — Divide the result by B to find X.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Rule of three example</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          If 20 items cost 10, how much do 30 items cost? With A = 10, B = 20 and C = 30, the formula is X = (A × C) ÷ B = (10 × 30) ÷ 20 = <strong className="text-foreground font-mono">15</strong>. This lets you find the proportional value quickly and easily.
        </p>
      </section>
    </>
  ),
};

export default function RuleOfThree() {
  const locale = useLocale();
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");

  const va = Number(a);
  const vb = Number(b);
  const vc = Number(c);
  const output =
    a && b && c && vb !== 0
      ? ((va * vc) / vb).toLocaleString(INTL_LOCALE[locale], { maximumFractionDigits: 6 })
      : null;

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: uiCopy.copied });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.valueA}</Label>
          <Input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder={copy.placeholderA} />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.valueB}</Label>
          <Input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder={copy.placeholderB} />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.valueC}</Label>
          <Input type="number" value={c} onChange={(e) => setC(e.target.value)} placeholder={copy.placeholderC} />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.resultX}</Label>
          <div className="flex gap-2">
            <Input readOnly value={output ?? ""} className="font-mono" placeholder="—" />
            <Button variant="outline" size="icon" onClick={handleCopy} disabled={!output} aria-label={copy.copyResult}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {output && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{copy.resultTitle}</p>
          <p className="text-2xl font-semibold font-mono text-foreground">{output}</p>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="calcular-tres" />

        <RelatedTools ids={["calcular-resto", "calculadora-de-porcentagem"]} />
      </div>
    </div>
  );
}
