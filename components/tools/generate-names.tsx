"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Copy } from "lucide-react";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gerador de Nomes</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Gere nomes completos aleatórios de forma rápida e prática. Escolha o gênero e crie nomes
          para testes, cadastros fictícios, jogos ou qualquer outra necessidade.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Gênero</Label>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={gender === "male" ? "default" : "secondary"}
              onClick={() => setGender("male")}
              className="flex-1"
            >
              Masculino
            </Button>
            <Button
              size="sm"
              variant={gender === "female" ? "default" : "secondary"}
              onClick={() => setGender("female")}
              className="flex-1"
            >
              Feminino
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} className="px-8">Gerar</Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!output} className="gap-2">
            <Copy className="h-4 w-4" /> Copiar
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {output && (
          <motion.div
            key={output}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border bg-muted p-5"
          >
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Nome gerado</p>
            <p className="text-xl font-semibold text-foreground tracking-wide">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como usar o gerador de nomes</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-1">
            <li>Escolha o gênero desejado (masculino ou feminino).</li>
            <li>Clique no botão <strong className="text-foreground">Gerar</strong>.</li>
            <li>Um nome completo será criado automaticamente.</li>
            <li>Clique em <strong className="text-foreground">Copiar</strong> para usar o nome gerado.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Para que usar um gerador de nomes?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Um gerador de nomes é útil para diversas situações, como testes de sistemas, criação de
            usuários fictícios, desenvolvimento de jogos, escrita de histórias ou qualquer contexto
            onde você precise de nomes aleatórios realistas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Gerador de nomes aleatórios</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Os nomes gerados são combinados automaticamente para simular nomes reais, facilitando o
            uso em ambientes de teste ou criação de conteúdo sem precisar inventar manualmente.
          </p>
        </section>

        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">NOTA:</strong> Os nomes gerados são fictícios e devem ser usados apenas para fins
            de teste, desenvolvimento ou entretenimento.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Gerar CPF", url: "/gerar-cpf" },
              { label: "Gerar CNPJ", url: "/gerar-cnpj" },
              { label: "Gerar Números", url: "/gerar-numeros" },
              { label: "Gerar Lorem Ipsum", url: "/gerar-lorem" },
              { label: "Gerar RG", url: "/gerar-rg" },
              { label: "Gerar CNH", url: "/gerar-cnh" },
            ].map((link) => (
              <Link key={link.url} href={link.url} className="text-sm text-primary hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
