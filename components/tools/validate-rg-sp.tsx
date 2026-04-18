"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { CheckCircle, XCircle, ShieldCheck } from "lucide-react";

function validateRgSpDigits(rg: string): boolean {
  const digits = rg.replace(/\D/g, "");
  if (digits.length !== 9) return false;
  if (/^(\d)\1{8}$/.test(digits)) return false;

  const nums = digits.split("").map(Number);
  const weights = [2, 3, 4, 5, 6, 7, 8, 9];
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += nums[7 - i] * weights[i];
  }
  const remainder = sum % 11;
  const check = remainder < 2 ? 0 : 11 - remainder;
  return nums[8] === check;
}

export default function ValidateRGSP() {
  const [rg, setRg] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    const clean = rg.replace(/\D/g, "");
    if (clean.length !== 9) {
      toast({ title: "Digite um RG com 9 dígitos", variant: "destructive" });
      return;
    }
    setIsValid(validateRgSpDigits(clean));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Validar RG – SSP SP</h1>
        <p className="mt-2 text-muted-foreground">
          Valide números de RG no padrão SSP SP de forma rápida e gratuita. Digite o RG abaixo e
          descubra se ele é válido de acordo com a regra de cálculo do dígito verificador.
        </p>
        <Link href="/gerar-rg" className="text-primary hover:underline text-sm mt-2 inline-block">
          Deseja gerar em vez de validar?
        </Link>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="rg-sp-input">RG</Label>
          <Input
            id="rg-sp-input"
            placeholder="00.000.000-0"
            value={rg}
            onChange={(e) => {
              setRg(e.target.value);
              setIsValid(null);
            }}
            maxLength={12}
          />
        </div>

        <Button onClick={handleValidate} className="w-full">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Validar
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isValid !== null && (
          <motion.div
            key={String(isValid)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-lg border p-6 flex items-center gap-3 ${
              isValid
                ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
                : "border-destructive/30 bg-destructive/10 text-destructive"
            }`}
          >
            {isValid ? (
              <>
                <CheckCircle className="h-6 w-6" />
                <span className="text-lg font-semibold">RG válido</span>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6" />
                <span className="text-lg font-semibold">RG inválido</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">O que é RG?</h2>
          <p>
            O RG (Registro Geral) é um documento de identificação civil utilizado no Brasil. Ele é
            emitido pelas Secretarias de Segurança Pública de cada estado e serve como principal
            identificação do cidadão em diversas situações.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">RG SSP SP</h2>
          <p>
            O RG emitido em São Paulo segue o padrão da Secretaria de Segurança Pública (SSP SP).
            Esse modelo utiliza uma estrutura numérica específica com dígito verificador para garantir
            autenticidade e consistência dos dados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Como funciona a validação do RG</h2>
          <p>
            A validação do RG é feita através do cálculo do dígito verificador. Esse dígito é gerado
            a partir dos números anteriores utilizando uma fórmula matemática específica. Se o
            resultado do cálculo corresponder ao dígito final informado, o RG é considerado válido.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Por que validar um RG?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Verificar dados em sistemas</li>
            <li>Evitar erros de digitação</li>
            <li>Garantir consistência em cadastros</li>
            <li>Testar aplicações e formulários</li>
          </ul>
        </section>

        <p className="text-sm italic">
          <strong>Nota:</strong> Esta ferramenta valida apenas a estrutura matemática do RG e não
          verifica se o documento existe ou pertence a uma pessoa real.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Veja também</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { label: "Gerar RG – SSP SP", to: "/gerar-rg" },
            { label: "Validar CPF", to: "/validar-cpf" },
            { label: "Validar CNPJ", to: "/validar-cnpj" },
            { label: "Validar RG – IFP RJ", to: "/validar-rj" },
            { label: "Validar CNH", to: "/validar-cnh" },
          ].map((link) => (
            <li key={link.to}>
              <Link href={link.to} className="text-primary hover:underline text-sm">{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
