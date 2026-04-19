"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Copy, User } from "lucide-react";

const maleFirstNames = [
  "João", "Pedro", "Lucas", "Gabriel", "Rafael", "Carlos", "Fernando", "André",
  "Marcos", "Bruno", "Diego", "Thiago", "Matheus", "Gustavo", "Leonardo",
  "Ricardo", "Eduardo", "Felipe", "Rodrigo", "Daniel", "Henrique", "Vitor",
  "Paulo", "Antônio", "José", "Miguel", "Arthur", "Bernardo", "Heitor", "Enzo",
];

const femaleFirstNames = [
  "Maria", "Ana", "Juliana", "Fernanda", "Camila", "Larissa", "Beatriz",
  "Amanda", "Carolina", "Patrícia", "Gabriela", "Mariana", "Isabela", "Letícia",
  "Aline", "Vanessa", "Bruna", "Natália", "Raquel", "Tatiana", "Helena",
  "Valentina", "Laura", "Alice", "Sophia", "Lívia", "Cecília", "Manuela",
  "Júlia", "Luísa",
];

const lastNames = [
  "Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Rodrigues",
  "Almeida", "Nascimento", "Lima", "Araújo", "Fernandes", "Carvalho", "Gomes",
  "Martins", "Rocha", "Ribeiro", "Barros", "Freitas", "Moreira", "Barbosa",
  "Cardoso", "Mendes", "Cavalcanti", "Monteiro", "Teixeira", "Vieira", "Nunes",
  "Campos", "Pinto",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFullName(gender: "male" | "female"): string {
  const first = gender === "male" ? pickRandom(maleFirstNames) : pickRandom(femaleFirstNames);
  const last1 = pickRandom(lastNames);
  let last2 = pickRandom(lastNames);
  while (last2 === last1) last2 = pickRandom(lastNames);
  return `${first} ${last1} ${last2}`;
}

export default function GenerateNames() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(generateFullName("male"));
  }, []);

  const handleGenerate = () => {
    setOutput(generateFullName(gender));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerador de Nomes</h1>
        <p className="mt-2 text-muted-foreground">
          Gere nomes completos aleatórios de forma rápida e prática. Escolha o gênero e crie nomes
          para testes, cadastros fictícios, jogos ou qualquer outra necessidade.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Gênero</Label>
          <RadioGroup
            value={gender}
            onValueChange={(v) => setGender(v as "male" | "female")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="gender-male" />
              <Label htmlFor="gender-male" className="cursor-pointer">Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="gender-female" />
              <Label htmlFor="gender-female" className="cursor-pointer">Feminino</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleGenerate} className="flex-1">
            <User className="mr-2 h-4 w-4" />
            Gerar
          </Button>
          <Button variant="outline" onClick={handleCopy} disabled={!output}>
            <Copy className="mr-2 h-4 w-4" />
            Copiar
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {output && (
          <motion.div
            key={output}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <Label className="text-sm text-muted-foreground">Resultado</Label>
            <p className="mt-2 text-2xl font-semibold text-foreground tracking-wide">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Como usar o gerador de nomes</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Escolha o gênero desejado (masculino ou feminino).</li>
            <li>Clique no botão <strong>Gerar</strong>.</li>
            <li>Um nome completo será criado automaticamente.</li>
            <li>Clique em <strong>Copiar</strong> para usar o nome gerado.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Para que usar um gerador de nomes?</h2>
          <p>
            Um gerador de nomes é útil para diversas situações, como testes de sistemas, criação de
            usuários fictícios, desenvolvimento de jogos, escrita de histórias ou qualquer contexto
            onde você precise de nomes aleatórios realistas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Gerador de nomes aleatórios</h2>
          <p>
            Os nomes gerados são combinados automaticamente para simular nomes reais, facilitando o
            uso em ambientes de teste ou criação de conteúdo sem precisar inventar manualmente.
          </p>
        </section>

        <p className="text-sm italic">
          <strong>Nota:</strong> Os nomes gerados são fictícios e devem ser usados apenas para fins
          de teste, desenvolvimento ou entretenimento.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Veja também</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { label: "Gerar CPF", to: "/gerar-cpf" },
            { label: "Gerar CNPJ", to: "/gerar-cnpj" },
            { label: "Gerar Números", to: "/gerar-numeros" },
            { label: "Gerar Lorem Ipsum", to: "/gerar-lorem" },
            { label: "Gerar RG", to: "/gerar-rg" },
            { label: "Gerar CNH", to: "/gerar-cnh" },
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
