
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useCopy } from "@/lib/i18n";
import { isAlphanumericCNPJ, isValidCNPJ, normalizeCNPJ } from "@/lib/cnpj";

const pt = {
  title: "Validar CNPJ",
  intro:
    "Valide rapidamente um CNPJ para verificar se ele é válido de acordo com as regras oficiais da Receita Federal, inclusive o novo CNPJ alfanumérico. Basta digitar o número no campo abaixo e clicar em validar para obter o resultado instantaneamente.",
  validate: "Validar",
  numericKind: "CNPJ",
  alphanumericKind: "CNPJ alfanumérico",
  valid: (kind: string) => `${kind} válido`,
  validDetail: "O número informado possui dígitos verificadores corretos.",
  invalid: (kind: string) => `${kind} inválido`,
  invalidDetail: "O número informado não possui dígitos verificadores válidos.",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é CNPJ?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          O CNPJ (Cadastro Nacional da Pessoa Jurídica) é um número único que identifica empresas e organizações no Brasil. Ele funciona como o "CPF das empresas" e é essencial para qualquer atividade legal, como emissão de notas fiscais, abertura de contas bancárias e cumprimento de obrigações fiscais.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a validação?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          O CNPJ possui 14 caracteres, sendo os dois últimos chamados de dígitos verificadores. Esses números são calculados com base nos demais caracteres usando um algoritmo matemático específico. No CNPJ alfanumérico, as 12 primeiras posições podem ter letras, e cada caractere entra no cálculo pelo seu código ASCII menos 48. A validação consiste em verificar o formato do número, recalcular os dígitos verificadores e comparar com os informados.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como usar</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Digite o CNPJ</strong> — Com ou sem pontuação.</li>
          <li><strong className="text-foreground">Clique em Validar</strong> — A verificação será feita automaticamente.</li>
          <li><strong className="text-foreground">Veja o resultado</strong> — Válido ou inválido será exibido instantaneamente.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Quando usar essa ferramenta?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Antes de salvar dados de clientes ou empresas</li>
          <li>Em validações de formulários</li>
          <li>Em integrações com sistemas externos</li>
          <li>Para evitar erros de digitação</li>
        </ul>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "CNPJ Validator",
  intro:
    "Quickly check whether a Brazilian CNPJ is valid according to the official rules of the Receita Federal (Brazil's federal tax authority), including the new alphanumeric CNPJ. Type the number in the field below and click validate to get the result instantly.",
  validate: "Validate",
  numericKind: "CNPJ",
  alphanumericKind: "alphanumeric CNPJ",
  valid: (kind: string) => `Valid ${kind}`,
  validDetail: "The number has correct check digits.",
  invalid: (kind: string) => `Invalid ${kind}`,
  invalidDetail: "The number does not have valid check digits.",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is a CNPJ?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The CNPJ (Cadastro Nacional da Pessoa Jurídica) is the Brazilian company taxpayer ID, a unique number that identifies businesses and organizations in Brazil. It works like a "CPF for companies" and is required for any legal activity, such as issuing invoices (notas fiscais), opening bank accounts and meeting tax obligations.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How does CNPJ validation work?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A CNPJ has 14 characters, and the last two are check digits. They are calculated from the other characters with a specific algorithm (weighted sums and modulo 11). In the alphanumeric CNPJ, the first 12 positions may contain letters, and each character enters the calculation as its ASCII code minus 48. Validation means checking the number&apos;s format, recalculating the check digits and comparing them with the ones provided.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to use</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Enter the CNPJ</strong> — With or without dots, slash and dash.</li>
          <li><strong className="text-foreground">Click Validate</strong> — The check runs automatically.</li>
          <li><strong className="text-foreground">See the result</strong> — Valid or invalid is shown instantly.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">When to use this tool</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Before saving Brazilian customer or company data</li>
          <li>When testing form validation</li>
          <li>When integrating with Brazilian systems and APIs</li>
          <li>To catch typos</li>
        </ul>
      </section>
    </>
  ),
};

export default function ValidateCNPJ() {
  const copy = useCopy({ pt, en });
  const [cnpj, setCnpj] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const normalized = normalizeCNPJ(cnpj);
  const kind = isAlphanumericCNPJ(normalized) ? copy.alphanumericKind : copy.numericKind;

  const handleChange = (val: string) => {
    setCnpj(val.toUpperCase().replace(/[^0-9A-Z./-]/g, "").slice(0, 18));
    setIsValid(null);
  };

  const handleValidate = () => {
    if (normalized.length !== 14) return;
    setIsValid(isValidCNPJ(normalized));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2 sm:w-80">
          <Label className="text-sm font-medium text-foreground">CNPJ</Label>
          <Input
            value={cnpj}
            onChange={(e) => handleChange(e.target.value)}

            placeholder="00.000.000/0000-00"
            autoCapitalize="characters"
          />
        </div>
      </div>

      <Button onClick={handleValidate} disabled={normalized.length !== 14}>{copy.validate}</Button>

      {isValid !== null && (
        <div className={`rounded-lg border p-5 flex items-center gap-3 ${isValid ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10"}`}>
          {isValid ? (
            <>
              <CheckCircle className="h-5 w-5 text-success shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{copy.valid(kind)}</p>
                <p className="text-xs text-muted-foreground">{copy.validDetail}</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{copy.invalid(kind)}</p>
                <p className="text-xs text-muted-foreground">{copy.invalidDetail}</p>
              </div>
            </>
          )}
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="validar-cnpj" />

        <RelatedTools ids={["cnpj-alfanumerico", "gerar-cnpj", "validar-cpf", "validar-cnh"]} />
      </div>
    </div>
  );
}
