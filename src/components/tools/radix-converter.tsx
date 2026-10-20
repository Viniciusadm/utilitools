import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";

type Base = "bin" | "oct" | "dec" | "hex";

const BASES: readonly Base[] = ["bin", "oct", "dec", "hex"];

const patterns: Record<Base, RegExp> = {
  bin: /^[01]*$/,
  oct: /^[0-7]*$/,
  dec: /^[0-9]*$/,
  hex: /^[0-9a-fA-F]*$/,
};

const radixes: Record<Base, number> = { bin: 2, oct: 8, dec: 10, hex: 16 };

const pt = {
  title: "Conversor de Bases Numéricas",
  intro:
    "Conversor de bases numéricas online. Você pode digitar um número em qualquer base (binário, octal, decimal ou hexadecimal) e ver a conversão automática para as demais. Basta inserir o valor em um dos campos e os outros serão preenchidos automaticamente com os resultados convertidos.",
  labels: {
    bin: "Binário (base 2)",
    oct: "Octal (base 8)",
    dec: "Decimal (base 10)",
    hex: "Hexadecimal (base 16)",
  } satisfies Record<Base, string>,
  placeholders: {
    bin: "Ex: 1010",
    oct: "Ex: 12",
    dec: "Ex: 255",
    hex: "Ex: FF",
  } satisfies Record<Base, string>,
  copyValue: (label: string) => `Copiar ${label}`,
  resultTitle: "Resultado da conversão",
  content: (
    <>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">O que são bases numéricas?</h2>
            <p className="text-[15px] leading-7 text-muted-foreground">
              As bases numéricas são sistemas usados para representar números utilizando diferentes conjuntos de símbolos. A base mais comum é a base 10 (decimal), que usamos no dia a dia. Já na computação, outras bases são muito utilizadas, como base 2 (binário), base 8 (octal) e base 16 (hexadecimal). Cada base define quantos símbolos podem ser usados para formar os números.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a conversão de bases numéricas?</h2>
            <p className="text-[15px] leading-7 text-muted-foreground">
              A conversão de bases numéricas consiste em transformar um número de uma base para outra equivalente. Por exemplo, um número em binário pode ser convertido para decimal, hexadecimal ou octal mantendo o mesmo valor, apenas mudando sua representação.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Como converter bases numéricas</h2>
            <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
              <li><strong className="text-foreground">Converter para decimal (base 10)</strong> — Multiplique cada dígito pela potência da base correspondente e some os resultados.</li>
              <li><strong className="text-foreground">Converter de decimal para outra base</strong> — Divida o número pela base desejada e utilize os restos da divisão para formar o resultado.</li>
              <li><strong className="text-foreground">Conversões diretas</strong> — Algumas conversões podem ser feitas agrupando bits (especialmente entre base 2, 8 e 16).</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Exemplos de conversão</h2>
            <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
              <li>Binário para decimal: <strong className="text-foreground font-mono">1010</strong> (base 2) = <strong className="text-foreground font-mono">10</strong> (base 10)</li>
              <li>Decimal para hexadecimal: <strong className="text-foreground font-mono">255</strong> (base 10) = <strong className="text-foreground font-mono">FF</strong> (base 16)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Principais bases numéricas</h2>
            <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Base 2 (Binário)</strong>: usa apenas 0 e 1</li>
              <li><strong className="text-foreground">Base 8 (Octal)</strong>: usa números de 0 a 7</li>
              <li><strong className="text-foreground">Base 10 (Decimal)</strong>: usa números de 0 a 9</li>
              <li><strong className="text-foreground">Base 16 (Hexadecimal)</strong>: usa 0 a 9 e letras A a F</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Onde as bases numéricas são usadas?</h2>
            <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Binário (base 2)</strong>: usado em computadores e eletrônica</li>
              <li><strong className="text-foreground">Octal (base 8)</strong>: usado em sistemas antigos e algumas aplicações específicas</li>
              <li><strong className="text-foreground">Decimal (base 10)</strong>: usado no dia a dia</li>
              <li><strong className="text-foreground">Hexadecimal (base 16)</strong>: usado em programação, cores e memória</li>
            </ul>
          </section>
    </>
  ),
};

const en: typeof pt = {
  title: "Number Base Converter",
  intro:
    "Online number base converter. Type a number in any base (binary, octal, decimal or hexadecimal) and see it converted to the others instantly. Just enter a value in one of the fields and the rest are filled in automatically with the converted results.",
  labels: {
    bin: "Binary (base 2)",
    oct: "Octal (base 8)",
    dec: "Decimal (base 10)",
    hex: "Hexadecimal (base 16)",
  },
  placeholders: {
    bin: "e.g. 1010",
    oct: "e.g. 12",
    dec: "e.g. 255",
    hex: "e.g. FF",
  },
  copyValue: (label: string) => `Copy ${label}`,
  resultTitle: "Conversion result",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What are number bases?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Number bases (or numeral systems) are ways of representing numbers with different sets of symbols. The most common one is base 10 (decimal), which we use every day. In computing, other bases are widely used, such as base 2 (binary), base 8 (octal) and base 16 (hexadecimal). Each base defines how many symbols can be used to write numbers.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How does number base conversion work?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Converting between number bases means rewriting a number from one base into an equivalent number in another. For example, a binary number can be converted to decimal, hexadecimal or octal: the value stays the same, only its representation changes.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to convert between number bases</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Convert to decimal (base 10)</strong> — Multiply each digit by the matching power of the base and add up the results.</li>
          <li><strong className="text-foreground">Convert from decimal to another base</strong> — Repeatedly divide the number by the target base and use the remainders to build the result.</li>
          <li><strong className="text-foreground">Direct conversions</strong> — Some conversions can be done by grouping bits (especially between bases 2, 8 and 16).</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Conversion examples</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Binary to decimal: <strong className="text-foreground font-mono">1010</strong> (base 2) = <strong className="text-foreground font-mono">10</strong> (base 10)</li>
          <li>Decimal to hexadecimal: <strong className="text-foreground font-mono">255</strong> (base 10) = <strong className="text-foreground font-mono">FF</strong> (base 16)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Main number bases</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li><strong className="text-foreground">Base 2 (Binary)</strong>: uses only 0 and 1</li>
          <li><strong className="text-foreground">Base 8 (Octal)</strong>: uses digits 0 to 7</li>
          <li><strong className="text-foreground">Base 10 (Decimal)</strong>: uses digits 0 to 9</li>
          <li><strong className="text-foreground">Base 16 (Hexadecimal)</strong>: uses 0 to 9 and letters A to F</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Where are number bases used?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li><strong className="text-foreground">Binary (base 2)</strong>: used in computers and electronics</li>
          <li><strong className="text-foreground">Octal (base 8)</strong>: used in older systems and some specific applications, such as Unix file permissions</li>
          <li><strong className="text-foreground">Decimal (base 10)</strong>: used in everyday life</li>
          <li><strong className="text-foreground">Hexadecimal (base 16)</strong>: used in programming, colors and memory addresses</li>
        </ul>
      </section>
    </>
  ),
};

export default function RadixConverter() {
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [values, setValues] = useState<Record<Base, string>>({ bin: "", oct: "", dec: "", hex: "" });

  const handleChange = (base: Base, raw: string) => {
    if (raw === "") {
      setValues({ bin: "", oct: "", dec: "", hex: "" });
      return;
    }
    if (!patterns[base].test(raw)) return;

    const parsed = parseInt(raw, radixes[base]);
    if (isNaN(parsed) || parsed < 0) return;

    setValues({
      bin: parsed.toString(2),
      oct: parsed.toString(8),
      dec: parsed.toString(10),
      hex: parsed.toString(16).toUpperCase(),
      [base]: raw.toUpperCase(),
    } as Record<Base, string>);
  };

  const handleCopy = (base: Base) => {
    if (values[base]) {
      navigator.clipboard.writeText(values[base]);
      toast({ title: uiCopy.copied });
    }
  };

  const hasResult = Object.values(values).some(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {BASES.map((base) => (
          <div key={base} className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.labels[base]}</Label>
            <div className="flex gap-2">
              <Input
                value={values[base]}
                onChange={(e) => handleChange(base, e.target.value)}
                className="font-mono"
                placeholder={copy.placeholders[base]}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopy(base)}
                disabled={!values[base]}
                aria-label={copy.copyValue(copy.labels[base])}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {hasResult && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{copy.resultTitle}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {BASES.map((base) => (
              <div key={base}>
                <p className="text-xs text-muted-foreground">{copy.labels[base]}</p>
                <p className="text-lg font-semibold font-mono text-foreground">{values[base]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="converter-numeros" />

        <RelatedTools ids={["gerar-numeros", "converter-temperaturas"]} />
      </div>
    </div>
  );
}
