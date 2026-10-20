
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useCopy } from "@/lib/i18n";

function validateCpfDigits(value: string): boolean {
  const cpf = value.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const digits = cpf.split("").map(Number);

  const sum1 = digits.slice(0, 9).reduce((acc, d, i) => acc + d * (10 - i), 0);
  const r1 = sum1 % 11;
  const d1 = r1 < 2 ? 0 : 11 - r1;
  if (digits[9] !== d1) return false;

  const sum2 = digits.slice(0, 10).reduce((acc, d, i) => acc + d * (11 - i), 0);
  const r2 = sum2 % 11;
  const d2 = r2 < 2 ? 0 : 11 - r2;
  if (digits[10] !== d2) return false;

  return true;
}

const pt = {
  title: "Validar CPF",
  intro:
    "Valide rapidamente um CPF para verificar se ele é válido de acordo com as regras oficiais da Receita Federal. Basta digitar o número no campo abaixo e clicar em validar para obter o resultado instantaneamente.",
  validate: "Validar",
  valid: "CPF válido",
  validDetail: "O número informado possui dígitos verificadores corretos.",
  invalid: "CPF inválido",
  invalidDetail: "O número informado não possui dígitos verificadores válidos.",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é CPF?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          O CPF (Cadastro de Pessoas Físicas) é um documento emitido pela Receita Federal do Brasil que identifica contribuintes. Ele é composto por 11 dígitos e é utilizado em diversas situações, como abertura de contas bancárias, declaração de imposto de renda e transações financeiras.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a validação?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          O CPF possui 11 dígitos, sendo os dois últimos chamados de dígitos verificadores. Esses números são calculados com base nos demais dígitos usando um algoritmo matemático específico. A validação consiste em verificar o formato do número, recalcular os dígitos verificadores e comparar com os informados.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como usar</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Digite o CPF</strong> — Com ou sem pontuação.</li>
          <li><strong className="text-foreground">Clique em Validar</strong> — A verificação será feita automaticamente.</li>
          <li><strong className="text-foreground">Veja o resultado</strong> — Válido ou inválido será exibido instantaneamente.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Quando usar essa ferramenta?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Antes de salvar dados de clientes</li>
          <li>Em validações de formulários</li>
          <li>Em integrações com sistemas externos</li>
          <li>Para evitar erros de digitação</li>
        </ul>
      </section>

      <section>
        <p className="text-sm text-muted-foreground italic">
          <strong className="text-foreground">Nota:</strong> Esta ferramenta valida apenas a estrutura matemática do CPF e não verifica se o documento existe ou pertence a uma pessoa real.
        </p>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "CPF Validator",
  intro:
    "Quickly check whether a Brazilian CPF number is valid according to the official rules of the Receita Federal (Brazil's federal tax authority). Type the number in the field below and click validate to get the result instantly.",
  validate: "Validate",
  valid: "Valid CPF",
  validDetail: "The number has correct check digits.",
  invalid: "Invalid CPF",
  invalidDetail: "The number does not have valid check digits.",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is a CPF?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The CPF (Cadastro de Pessoas Físicas) is the Brazilian individual taxpayer ID, issued by the Receita Federal. It has 11 digits and is used everywhere in Brazil: opening bank accounts, filing income tax returns, shopping online and signing up for services.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How does CPF validation work?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A CPF has 11 digits, and the last two are check digits. They are calculated from the other digits with a specific algorithm (weighted sums and modulo 11). Validation means checking the number&apos;s format, recalculating the check digits and comparing them with the ones provided.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to use</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Enter the CPF</strong> — With or without dots and dash.</li>
          <li><strong className="text-foreground">Click Validate</strong> — The check runs automatically.</li>
          <li><strong className="text-foreground">See the result</strong> — Valid or invalid is shown instantly.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">When to use this tool</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Before saving Brazilian customer data</li>
          <li>When testing form validation</li>
          <li>When integrating with Brazilian systems and APIs</li>
          <li>To catch typos</li>
        </ul>
      </section>

      <section>
        <p className="text-sm text-muted-foreground italic">
          <strong className="text-foreground">Note:</strong> This tool only checks the mathematical structure of the CPF. It does not verify whether the document exists or belongs to a real person.
        </p>
      </section>
    </>
  ),
};

export default function ValidateCPF() {
  const copy = useCopy({ pt, en });
  const [cpf, setCpf] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const digitsOnly = cpf.replace(/\D/g, "");

  const handleChange = (val: string) => {
    setCpf(val.replace(/[^\d.-]/g, "").slice(0, 14));
    setIsValid(null);
  };

  const handleValidate = () => {
    if (digitsOnly.length !== 11) return;
    setIsValid(validateCpfDigits(digitsOnly));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2 sm:w-80">
          <Label className="text-sm font-medium text-foreground">CPF</Label>
          <Input
            value={cpf}
            onChange={(e) => handleChange(e.target.value)}

            placeholder="000.000.000-00"
            inputMode="numeric"
          />
        </div>
      </div>

      <Button onClick={handleValidate} disabled={digitsOnly.length !== 11}>{copy.validate}</Button>

      {isValid !== null && (
        <div className={`rounded-lg border p-5 flex items-center gap-3 ${isValid ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10"}`}>
          {isValid ? (
            <>
              <CheckCircle className="h-5 w-5 text-success shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{copy.valid}</p>
                <p className="text-xs text-muted-foreground">{copy.validDetail}</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{copy.invalid}</p>
                <p className="text-xs text-muted-foreground">{copy.invalidDetail}</p>
              </div>
            </>
          )}
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="validar-cpf" />

        <RelatedTools ids={["gerar-cpf", "validar-cnpj", "validar-cnh", "validar-rg", "validar-rj"]} />
      </div>
    </div>
  );
}
