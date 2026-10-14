
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { ToolFaq } from "@/components/tool-faq";

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

export default function ValidateCNH() {
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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Validar CNH</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Valide números de CNH de forma rápida e segura. Digite o número da Carteira Nacional de Habilitação e verifique se ele é válido com base nos dígitos verificadores.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2 sm:w-80">
          <Label className="text-sm font-medium text-foreground">CNH</Label>
          <Input
            value={cnh}
            onChange={(e) => { setCnh(e.target.value.replace(/\D/g, "").slice(0, 11)); setIsValid(null); }}
           
            placeholder="Digite os 11 dígitos da CNH"
            maxLength={11}
            inputMode="numeric"
          />
        </div>
      </div>

      <Button onClick={handleValidate} disabled={cnh.replace(/\D/g, "").length !== 11}>Validar</Button>

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
                  <p className="text-sm font-semibold text-foreground">CNH válida</p>
                  <p className="text-xs text-muted-foreground">O número informado possui dígitos verificadores corretos.</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">CNH inválida</p>
                  <p className="text-xs text-muted-foreground">O número informado não possui dígitos verificadores válidos.</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
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

        <ToolFaq segment="validar-cnh" />

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/gerar-cnh" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Gerar CNH</a>
            <a href="/validar-cpf" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Validar CPF</a>
            <a href="/validar-cnpj" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Validar CNPJ</a>
            <a href="/validar-rg" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Validar RG</a>
            <a href="/validar-rj" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Validar RJ</a>
          </div>
        </section>
      </div>
    </div>
  );
}
