import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { numberToPortugueseWords, type SpellOutError, type SpellOutResult } from "@/lib/extenso";
import { numberToEnglishWords } from "@/lib/number-to-words-en";
import { Copy } from "lucide-react";
import { ToolFaq } from "@/components/tool-faq";
import { RelatedTools } from "@/components/related-tools";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";

type SpellOutCopy = {
  spellOut: (input: string) => SpellOutResult;
  errors: Record<SpellOutError, string>;
  title: string;
  intro: string;
  inputLabel: string;
  placeholder: string;
  convert: string;
  copy: string;
  result: string;
  content: ReactNode;
};

const pt: SpellOutCopy = {
  spellOut: numberToPortugueseWords,
  errors: {
    invalid: "Número inválido",
    tooLarge: "Número muito grande (máximo: quatrilhões)",
  },
  title: "Número por Extenso",
  intro:
    "Converta números em texto por extenso de forma rápida e precisa. Basta digitar qualquer número e obter sua escrita completa, ideal para cheques, documentos, contratos e uso acadêmico.",
  inputLabel: "Número a ser escrito por extenso",
  placeholder: "Ex: 1234",
  convert: "Escrever por extenso",
  copy: "Copiar",
  result: "Resultado",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é número por extenso?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Escrever um número por extenso significa representá-lo utilizando palavras em vez de algarismos.
          Por exemplo, o número 123 pode ser escrito como "cento e vinte e três".
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como escrever números por extenso</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Digite o número desejado.</li>
          <li>Clique em <strong className="text-foreground">Escrever por extenso</strong>.</li>
          <li>Visualize o resultado completo.</li>
          <li>Copie, se necessário.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Regras básicas de números por extenso</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li><strong className="text-foreground">Números até dez:</strong> geralmente escritos por extenso, como "um", "dois", "três".</li>
          <li><strong className="text-foreground">Dezenas e centenas:</strong> utiliza-se "e" para ligar os termos, como "duzentos e cinquenta".</li>
          <li><strong className="text-foreground">Milhares e milhões:</strong> seguem estrutura organizada, como "dois mil", "um milhão".</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Para que usar números por extenso?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Preenchimento de cheques</li>
          <li>Documentos oficiais</li>
          <li>Contratos</li>
          <li>Trabalhos acadêmicos</li>
          <li>Evitar erros ou fraudes em valores</li>
        </ul>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">DICA:</strong> Sempre revise a escrita por extenso em documentos importantes,
          especialmente em valores financeiros, para evitar inconsistências.
        </p>
      </div>
    </>
  ),
};

const en: SpellOutCopy = {
  spellOut: numberToEnglishWords,
  errors: {
    invalid: "Invalid number",
    tooLarge: "Number too large (maximum: quadrillions)",
  },
  title: "Number to Words Converter",
  intro:
    "Convert numbers to words in English quickly and accurately. Type any whole number and get it spelled out in full, ideal for writing checks, invoices, contracts and academic work.",
  inputLabel: "Number to spell out",
  placeholder: "e.g. 1234",
  convert: "Convert to words",
  copy: "Copy",
  result: "Result",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What does writing a number in words mean?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Writing a number in words means representing it with words instead of digits. For example, the number 123 is
          written as "one hundred twenty-three", and 1,200,000 as "one million two hundred thousand".
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to convert a number to words</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Type the number.</li>
          <li>Click <strong className="text-foreground">Convert to words</strong>.</li>
          <li>See the number spelled out in full.</li>
          <li>Copy it if you need to.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Rules for writing numbers in words in English</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li><strong className="text-foreground">Hyphens:</strong> compound numbers from 21 to 99 take a hyphen, as in "twenty-one" or "ninety-nine".</li>
          <li><strong className="text-foreground">No plural scales:</strong> "hundred", "thousand" and "million" stay singular after a number: "two hundred", "five million".</li>
          <li><strong className="text-foreground">"And" is optional:</strong> American English usually writes "one hundred twenty-three", while British English adds "and": "one hundred and twenty-three".</li>
          <li><strong className="text-foreground">No commas needed:</strong> groups are simply written in order, from the largest to the smallest, as in "three thousand four hundred five".</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">When to write numbers in words</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Writing checks (cheques), where the amount must appear in words</li>
          <li>Invoices, receipts and promissory notes</li>
          <li>Contracts and legal documents</li>
          <li>Academic and formal writing</li>
          <li>Preventing mistakes or fraud in amounts</li>
        </ul>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">TIP:</strong> Always double-check the amount in words on important documents,
          especially financial ones, to avoid inconsistencies.
        </p>
      </div>
    </>
  ),
};

export default function NumbersSpellOut() {
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [numberInput, setNumberInput] = useState("");
  const [result, setResult] = useState<SpellOutResult | null>(null);

  const output = result ? ("words" in result ? result.words : copy.errors[result.error]) : "";

  const handleConvert = () => {
    if (!numberInput.trim()) return;
    setResult(copy.spellOut(numberInput.trim()));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: uiCopy.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">{copy.inputLabel}</Label>
        <Input
          type="text"
          inputMode="numeric"
          placeholder={copy.placeholder}
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value.replace(/[^\d]/g, ""))}

        />
      </div>

      <div className="flex gap-3">
        <Button onClick={handleConvert} className="px-8">{copy.convert}</Button>
        <Button variant="secondary" onClick={handleCopy} className="gap-2">
          <Copy className="h-4 w-4" /> {copy.copy}
        </Button>
      </div>

      {output && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm font-medium text-muted-foreground mb-2">{copy.result}</p>
          <p className="text-lg text-foreground font-semibold">{output}</p>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="numeros-por-extenso" />

        <RelatedTools ids={["gerar-cpf", "gerar-cnpj", "gerar-numeros", "converter-numeros", "gerar-lorem"]} />
      </div>
    </div>
  );
}
