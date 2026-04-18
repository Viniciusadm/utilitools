"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

function validateCnpjDigits(value: string): boolean {
  const cnpj = value.replace(/\D/g, "");
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const digits = cnpj.split("").map(Number);

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum1 = digits.slice(0, 12).reduce((acc, d, i) => acc + d * weights1[i], 0);
  const r1 = sum1 % 11;
  const d1 = r1 < 2 ? 0 : 11 - r1;
  if (digits[12] !== d1) return false;

  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum2 = digits.slice(0, 13).reduce((acc, d, i) => acc + d * weights2[i], 0);
  const r2 = sum2 % 11;
  const d2 = r2 < 2 ? 0 : 11 - r2;
  if (digits[13] !== d2) return false;

  return true;
}

export default function ValidateCNPJ() {
  const [cnpj, setCnpj] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const digitsOnly = cnpj.replace(/\D/g, "");

  const handleChange = (val: string) => {
    setCnpj(val.replace(/[^\d./\-]/g, "").slice(0, 18));
    setIsValid(null);
  };

  const handleValidate = () => {
    if (digitsOnly.length !== 14) return;
    setIsValid(validateCnpjDigits(digitsOnly));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Validar CNPJ</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Valide rapidamente um CNPJ para verificar se ele é válido de acordo com as regras oficiais da Receita Federal. Basta digitar o número no campo abaixo e clicar em validar para obter o resultado instantaneamente.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2 sm:w-80">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">CNPJ</Label>
          <Input
            value={cnpj}
            onChange={(e) => handleChange(e.target.value)}
            className="bg-muted border-border"
            placeholder="00.000.000/0000-00"
            inputMode="numeric"
          />
        </div>
      </div>

      <Button onClick={handleValidate} disabled={digitsOnly.length !== 14}>Validar</Button>

      <AnimatePresence mode="wait">
        {isValid !== null && (
          <motion.div
            key={String(isValid)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`rounded-md border p-5 flex items-center gap-3 ${isValid ? "border-green-500/30 bg-green-500/10" : "border-destructive/30 bg-destructive/10"}`}
          >
            {isValid ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">CNPJ válido</p>
                  <p className="text-xs text-muted-foreground">O número informado possui dígitos verificadores corretos.</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">CNPJ inválido</p>
                  <p className="text-xs text-muted-foreground">O número informado não possui dígitos verificadores válidos.</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é CNPJ?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O CNPJ (Cadastro Nacional da Pessoa Jurídica) é um número único que identifica empresas e organizações no Brasil. Ele funciona como o "CPF das empresas" e é essencial para qualquer atividade legal, como emissão de notas fiscais, abertura de contas bancárias e cumprimento de obrigações fiscais.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a validação?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O CNPJ possui 14 dígitos, sendo os dois últimos chamados de dígitos verificadores. Esses números são calculados com base nos demais dígitos usando um algoritmo matemático específico. A validação consiste em verificar o formato do número, recalcular os dígitos verificadores e comparar com os informados.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como usar</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-2">
            <li><strong className="text-foreground">Digite o CNPJ</strong> — Com ou sem pontuação.</li>
            <li><strong className="text-foreground">Clique em Validar</strong> — A verificação será feita automaticamente.</li>
            <li><strong className="text-foreground">Veja o resultado</strong> — Válido ou inválido será exibido instantaneamente.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Quando usar essa ferramenta?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li>Antes de salvar dados de clientes ou empresas</li>
            <li>Em validações de formulários</li>
            <li>Em integrações com sistemas externos</li>
            <li>Para evitar erros de digitação</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/gerar-cnpj" className="text-sm text-primary hover:underline">Gerar CNPJ</Link>
            <Link href="/validar-cpf" className="text-sm text-primary hover:underline">Validar CPF</Link>
            <Link href="/validar-cnh" className="text-sm text-primary hover:underline">Validar CNH</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
