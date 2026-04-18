"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

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

export default function ValidateCPF() {
  const [cpf, setCpf] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const digitsOnly = cpf.replace(/\D/g, "");

  const handleChange = (val: string) => {
    setCpf(val.replace(/[^\d.\-]/g, "").slice(0, 14));
    setIsValid(null);
  };

  const handleValidate = () => {
    if (digitsOnly.length !== 11) return;
    setIsValid(validateCpfDigits(digitsOnly));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Validar CPF</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Valide rapidamente um CPF para verificar se ele é válido de acordo com as regras oficiais da Receita Federal. Basta digitar o número no campo abaixo e clicar em validar para obter o resultado instantaneamente.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2 sm:w-80">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">CPF</Label>
          <Input
            value={cpf}
            onChange={(e) => handleChange(e.target.value)}
            className="bg-muted border-border"
            placeholder="000.000.000-00"
            inputMode="numeric"
          />
        </div>
      </div>

      <Button onClick={handleValidate} disabled={digitsOnly.length !== 11}>Validar</Button>

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
                  <p className="text-sm font-semibold text-foreground">CPF válido</p>
                  <p className="text-xs text-muted-foreground">O número informado possui dígitos verificadores corretos.</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">CPF inválido</p>
                  <p className="text-xs text-muted-foreground">O número informado não possui dígitos verificadores válidos.</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é CPF?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O CPF (Cadastro de Pessoas Físicas) é um documento emitido pela Receita Federal do Brasil que identifica contribuintes. Ele é composto por 11 dígitos e é utilizado em diversas situações, como abertura de contas bancárias, declaração de imposto de renda e transações financeiras.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a validação?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O CPF possui 11 dígitos, sendo os dois últimos chamados de dígitos verificadores. Esses números são calculados com base nos demais dígitos usando um algoritmo matemático específico. A validação consiste em verificar o formato do número, recalcular os dígitos verificadores e comparar com os informados.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como usar</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-2">
            <li><strong className="text-foreground">Digite o CPF</strong> — Com ou sem pontuação.</li>
            <li><strong className="text-foreground">Clique em Validar</strong> — A verificação será feita automaticamente.</li>
            <li><strong className="text-foreground">Veja o resultado</strong> — Válido ou inválido será exibido instantaneamente.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Quando usar essa ferramenta?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
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

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/gerar-cpf" className="text-sm text-primary hover:underline">Gerar CPF</Link>
            <Link href="/validar-cnpj" className="text-sm text-primary hover:underline">Validar CNPJ</Link>
            <Link href="/validar-cnh" className="text-sm text-primary hover:underline">Validar CNH</Link>
            <Link href="/validar-rg" className="text-sm text-primary hover:underline">Validar RG SP</Link>
            <Link href="/validar-rj" className="text-sm text-primary hover:underline">Validar RG RJ</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
