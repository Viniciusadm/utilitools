
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { ToolFaq } from "@/components/tool-faq";
import { isAlphanumericCNPJ, isValidCNPJ, normalizeCNPJ } from "@/lib/cnpj";

export default function ValidateCNPJ() {
  const [cnpj, setCnpj] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const normalized = normalizeCNPJ(cnpj);
  const kind = isAlphanumericCNPJ(normalized) ? "CNPJ alfanumérico" : "CNPJ";

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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Validar CNPJ</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Valide rapidamente um CNPJ para verificar se ele é válido de acordo com as regras oficiais da Receita Federal, inclusive o novo CNPJ alfanumérico. Basta digitar o número no campo abaixo e clicar em validar para obter o resultado instantaneamente.
        </p>
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

      <Button onClick={handleValidate} disabled={normalized.length !== 14}>Validar</Button>

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
                  <p className="text-sm font-semibold text-foreground">{kind} válido</p>
                  <p className="text-xs text-muted-foreground">O número informado possui dígitos verificadores corretos.</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{kind} inválido</p>
                  <p className="text-xs text-muted-foreground">O número informado não possui dígitos verificadores válidos.</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
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

        <ToolFaq segment="validar-cnpj" />

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/cnpj-alfanumerico" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">CNPJ Alfanumérico</a>
            <a href="/gerar-cnpj" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Gerar CNPJ</a>
            <a href="/validar-cpf" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Validar CPF</a>
            <a href="/validar-cnh" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Validar CNH</a>
          </div>
        </section>
      </div>
    </div>
  );
}
