import { useEffect, useId, useState } from "react";
import { CheckCircle, Copy, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { generateCNPJ, isValidCNPJ, normalizeCNPJ } from "@/lib/cnpj";

const EXAMPLE_CNPJ = "12.ABC.345/01DE-35";

const CHARACTER_VALUES = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => ({
  char,
  value: char.charCodeAt(0) - 48,
}));

const EXAMPLE_STEPS = [
  { char: "1", value: 1, weight: 5 },
  { char: "2", value: 2, weight: 4 },
  { char: "A", value: 17, weight: 3 },
  { char: "B", value: 18, weight: 2 },
  { char: "C", value: 19, weight: 9 },
  { char: "3", value: 3, weight: 8 },
  { char: "4", value: 4, weight: 7 },
  { char: "5", value: 5, weight: 6 },
  { char: "0", value: 0, weight: 5 },
  { char: "1", value: 1, weight: 4 },
  { char: "D", value: 20, weight: 3 },
  { char: "E", value: 21, weight: 2 },
];

export default function CnpjAlphanumeric() {
  const inputId = useId();
  const [cnpj, setCnpj] = useState(EXAMPLE_CNPJ);
  const [generated, setGenerated] = useState("");

  useEffect(() => {
    setGenerated(generateCNPJ(true, true));
  }, []);

  const normalized = normalizeCNPJ(cnpj);
  const complete = normalized.length === 14;
  const valid = complete && isValidCNPJ(normalized);

  const copyGenerated = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    toast({ title: "CNPJ copiado!" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">CNPJ Alfanumérico</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Valide e gere CNPJs no novo formato alfanumérico da Receita Federal, que combina letras e números. Entenda o que
          mudou, como fica o número e como calcular os dígitos verificadores passo a passo.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-semibold text-foreground">Validar CNPJ alfanumérico</h2>
          <div className="space-y-2">
            <Label htmlFor={inputId} className="text-sm font-medium text-foreground">
              CNPJ
            </Label>
            <Input
              id={inputId}
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value.toUpperCase().replace(/[^0-9A-Z./-]/g, "").slice(0, 18))}
              placeholder="12.ABC.345/01DE-35"
              autoCapitalize="characters"
              className="font-mono"
            />
          </div>
          <div
            aria-live="polite"
            className={cn(
              "flex items-center gap-2 rounded-md border p-3 text-sm font-medium",
              !complete && "border-border bg-muted/60 text-muted-foreground",
              complete && valid && "border-success/30 bg-success/10 text-foreground",
              complete && !valid && "border-destructive/30 bg-destructive/10 text-foreground",
            )}
          >
            {!complete && "Digite os 14 caracteres do CNPJ"}
            {complete && valid && (
              <>
                <CheckCircle className="h-4 w-4 text-success shrink-0" /> CNPJ válido
              </>
            )}
            {complete && !valid && (
              <>
                <XCircle className="h-4 w-4 text-destructive shrink-0" /> CNPJ inválido
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-semibold text-foreground">Gerar CNPJ alfanumérico</h2>
          <output className="block min-h-12 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 font-mono text-lg font-semibold text-foreground">
            {generated}
          </output>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setGenerated(generateCNPJ(true, true))} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Gerar outro
            </Button>
            <Button variant="secondary" onClick={copyGenerated} className="gap-2">
              <Copy className="h-4 w-4" /> Copiar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Precisa de vários de uma vez? Use o <a href="/gerar-cnpj" className="text-primary hover:underline">gerador de CNPJ</a>.
          </p>
        </div>
      </div>

      <div className="space-y-8 border-t border-border pt-10">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é o CNPJ alfanumérico?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            É o novo formato do Cadastro Nacional da Pessoa Jurídica, criado pela Instrução Normativa RFB nº 2.229/2024. O
            número continua com 14 posições, mas as 12 primeiras (a raiz e a ordem do estabelecimento) passam a aceitar
            letras de A a Z além dos números. Os dois últimos caracteres continuam sendo dígitos verificadores numéricos.
            A mudança foi necessária porque as combinações apenas numéricas estavam se esgotando.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que muda e o que não muda</h2>
          <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
            <li>Novas inscrições passaram a receber CNPJ alfanumérico a partir de julho de 2026.</li>
            <li>Empresas que já têm CNPJ continuam com o mesmo número numérico.</li>
            <li>A máscara continua a mesma: {EXAMPLE_CNPJ}.</li>
            <li>Sistemas, bancos de dados e formulários precisam aceitar letras nas 12 primeiras posições.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como calcular o dígito verificador</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            O cálculo é o mesmo módulo 11 do CNPJ numérico. A diferença é que cada caractere é convertido em número pelo
            seu código ASCII menos 48. Assim, os algarismos de 0 a 9 mantêm o próprio valor e as letras vão de A = 17 a
            Z = 42.
          </p>
          <ol className="mt-3 text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
            <li>Converta os 12 primeiros caracteres usando a tabela abaixo.</li>
            <li>Multiplique pelos pesos 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 e some.</li>
            <li>Calcule o resto da divisão por 11. Se for 0 ou 1, o dígito é 0; senão, é 11 menos o resto.</li>
            <li>Repita com os 12 caracteres mais o primeiro dígito, usando os pesos 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Exemplo: {EXAMPLE_CNPJ}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-center font-mono text-sm">
              <tbody>
                {[
                  { label: "Caractere", values: EXAMPLE_STEPS.map((s) => s.char) },
                  { label: "Valor", values: EXAMPLE_STEPS.map((s) => s.value) },
                  { label: "Peso", values: EXAMPLE_STEPS.map((s) => s.weight) },
                  { label: "Produto", values: EXAMPLE_STEPS.map((s) => s.value * s.weight) },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border">
                    <th scope="row" className="py-2 pr-3 text-left font-sans text-xs font-medium text-muted-foreground">
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={i} className="py-2 text-foreground">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
            A soma dos produtos é 459. O resto de 459 ÷ 11 é 8, então o primeiro dígito é 11 − 8 ={" "}
            <strong className="text-foreground font-mono">3</strong>. Repetindo o cálculo com o 3 incluído, o segundo
            dígito é <strong className="text-foreground font-mono">5</strong>, formando o CNPJ {EXAMPLE_CNPJ}.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Tabela de valores dos caracteres</h2>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-9">
            {CHARACTER_VALUES.map(({ char, value }) => (
              <div key={char} className="rounded-md border border-border bg-card px-2 py-1.5 text-center font-mono text-sm">
                <span className="font-semibold text-foreground">{char}</span>
                <span className="text-muted-foreground"> = {value}</span>
              </div>
            ))}
          </div>
        </section>

        <ToolFaq segment="cnpj-alfanumerico" />

        <RelatedTools segments={["validar-cnpj", "gerar-cnpj", "validar-cpf", "gerar-cpf"]} />
      </div>
    </div>
  );
}
