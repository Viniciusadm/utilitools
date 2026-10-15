
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useCopy } from "@/lib/i18n";

function validateCnhDigits(cnh: string): boolean {
  if (!/^\d{11}$/.test(cnh)) return false;
  if (/^(\d)\1{10}$/.test(cnh)) return false;

  const digits = cnh.split("").map(Number);

  let sum1 = 0;
  for (let i = 0; i < 9; i++) {
    sum1 += digits[i] * (9 - i);
  }
  let dv1 = sum1 % 11;
  if (dv1 >= 10) dv1 = 0;

  let sum2 = 0;
  for (let i = 0; i < 9; i++) {
    sum2 += digits[i] * (1 + i);
  }
  let dv2 = sum2 % 11;
  if (dv2 >= 10) dv2 = 0;

  return digits[9] === dv1 && digits[10] === dv2;
}

const pt = {
  title: "Validar CNH",
  intro:
    "Valide números de CNH de forma rápida e segura. Digite o número da Carteira Nacional de Habilitação e verifique se ele é válido com base nos dígitos verificadores.",
  placeholder: "Digite os 11 dígitos da CNH",
  validate: "Validar",
  valid: "CNH válida",
  validDetail: "O número informado possui dígitos verificadores corretos.",
  invalid: "CNH inválida",
  invalidDetail: "O número informado não possui dígitos verificadores válidos.",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é validar CNH?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Validar uma CNH significa verificar se o número informado segue as regras oficiais de formação, incluindo os dígitos verificadores que garantem sua autenticidade.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como validar uma CNH</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Digite o número da CNH</strong> — Informe os 11 dígitos.</li>
          <li><strong className="text-foreground">Clique em Validar</strong> — A verificação será feita automaticamente.</li>
          <li><strong className="text-foreground">Veja o resultado</strong> — A ferramenta indicará se o número é válido ou inválido.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como é formado o número da CNH</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          O número da CNH é composto por 11 dígitos: os 9 primeiros são números base e os 2 últimos são dígitos verificadores (DV). Esses dígitos são calculados a partir de regras matemáticas que garantem a validade do documento.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Para que validar uma CNH?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Verificar dados informados em cadastros</li>
          <li>Evitar erros em sistemas</li>
          <li>Garantir consistência de informações</li>
          <li>Uso em aplicações e testes</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Importante</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Esta validação verifica apenas se o número é matematicamente válido. Ela não confirma se a CNH realmente existe ou pertence a uma pessoa.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Dica</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Digite apenas números, sem espaços ou caracteres especiais, para garantir uma validação correta.
        </p>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "CNH Validator",
  intro:
    "Validate Brazilian driver's license (CNH) numbers quickly and safely. Enter the Carteira Nacional de Habilitação registration number and check whether it is valid based on its check digits.",
  placeholder: "Enter the 11 CNH digits",
  validate: "Validate",
  valid: "Valid CNH",
  validDetail: "The number has correct check digits.",
  invalid: "Invalid CNH",
  invalidDetail: "The number does not have valid check digits.",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What does validating a CNH mean?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Validating a CNH (the Brazilian driver&apos;s license) means checking whether the registration number follows the official formation rules, including the check digits that protect it against typos and made-up numbers.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to validate a CNH</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Enter the CNH number</strong> — Type all 11 digits.</li>
          <li><strong className="text-foreground">Click Validate</strong> — The check runs automatically.</li>
          <li><strong className="text-foreground">See the result</strong> — The tool tells you whether the number is valid or invalid.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How a CNH number is formed</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A CNH number has 11 digits: the first 9 are the base number and the last 2 are check digits (DV, dígitos verificadores). The check digits are calculated with weighted sums and modulo 11, which is what makes a number mathematically valid.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Why validate a CNH?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Check data entered in sign-up forms</li>
          <li>Prevent errors in your systems</li>
          <li>Keep your data consistent</li>
          <li>Use in applications and QA testing</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Important</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          This validation only checks whether the number is mathematically valid. It does not confirm that the CNH actually exists or belongs to a real person.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Tip</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Type digits only, without spaces or special characters, to make sure the validation is correct.
        </p>
      </section>
    </>
  ),
};

export default function ValidateCNH() {
  const copy = useCopy({ pt, en });
  const [cnh, setCnh] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    const digitsOnly = cnh.replace(/\D/g, "");
    if (!digitsOnly) return;
    setIsValid(validateCnhDigits(digitsOnly));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2 sm:w-80">
          <Label className="text-sm font-medium text-foreground">CNH</Label>
          <Input
            value={cnh}
            onChange={(e) => { setCnh(e.target.value.replace(/\D/g, "").slice(0, 11)); setIsValid(null); }}

            placeholder={copy.placeholder}
            maxLength={11}
            inputMode="numeric"
          />
        </div>
      </div>

      <Button onClick={handleValidate} disabled={cnh.replace(/\D/g, "").length !== 11}>{copy.validate}</Button>

      <AnimatePresence mode="wait">
        {isValid !== null && (
          <motion.div
            key={String(isValid)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`rounded-lg border p-5 flex items-center gap-3 ${isValid ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10"}`}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="validar-cnh" />

        <RelatedTools ids={["gerar-cnh", "validar-cpf", "validar-cnpj", "validar-rg", "validar-rj"]} />
      </div>
    </div>
  );
}
