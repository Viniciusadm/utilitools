
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";

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

type Gender = "male" | "female";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFullName(gender: Gender): string {
  const first = gender === "male" ? pickRandom(maleFirstNames) : pickRandom(femaleFirstNames);
  const last1 = pickRandom(lastNames);
  let last2 = pickRandom(lastNames);
  while (last2 === last1) last2 = pickRandom(lastNames);
  return `${first} ${last1} ${last2}`;
}

const pt = {
  title: "Gerador de Nomes",
  intro:
    "Gere nomes completos aleatórios de forma rápida e prática. Escolha o gênero e crie nomes para testes, cadastros fictícios, jogos ou qualquer outra necessidade.",
  genderLabel: "Gênero",
  male: "Masculino",
  female: "Feminino",
  generate: "Gerar",
  copy: "Copiar",
  generatedName: "Nome gerado",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como usar o gerador de nomes</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Escolha o gênero desejado (masculino ou feminino).</li>
          <li>Clique no botão <strong className="text-foreground">Gerar</strong>.</li>
          <li>Um nome completo será criado automaticamente.</li>
          <li>Clique em <strong className="text-foreground">Copiar</strong> para usar o nome gerado.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Para que usar um gerador de nomes?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Um gerador de nomes é útil para diversas situações, como testes de sistemas, criação de
          usuários fictícios, desenvolvimento de jogos, escrita de histórias ou qualquer contexto
          onde você precise de nomes aleatórios realistas.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Gerador de nomes aleatórios</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Os nomes gerados são combinados automaticamente para simular nomes reais, facilitando o
          uso em ambientes de teste ou criação de conteúdo sem precisar inventar manualmente.
        </p>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTA:</strong> Os nomes gerados são fictícios e devem ser usados apenas para fins
          de teste, desenvolvimento ou entretenimento.
        </p>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "Random Brazilian Name Generator",
  intro:
    "Generate random, realistic Brazilian full names in one click. Choose the gender and create Portuguese-style names for test data, mock user accounts, QA, games or any other purpose.",
  genderLabel: "Gender",
  male: "Male",
  female: "Female",
  generate: "Generate",
  copy: "Copy",
  generatedName: "Generated name",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to use the name generator</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Choose the gender (male or female).</li>
          <li>Click the <strong className="text-foreground">Generate</strong> button.</li>
          <li>A full Brazilian name is created automatically.</li>
          <li>Click <strong className="text-foreground">Copy</strong> to use the generated name.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Why use a Brazilian name generator?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Realistic Brazilian names are handy whenever you build or test software for Brazil: filling forms, seeding
          databases, creating mock customers alongside a generated CPF, testing how your system handles accented
          characters (like João, Lívia or Araújo), developing games or writing stories set in Brazil.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How Brazilian names are built</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Brazilians usually have a first name followed by two surnames, typically one from the mother and one from the
          father, such as Maria Silva Santos. The generator combines common Brazilian first names and surnames to
          simulate real names, so you don't have to invent them by hand.
        </p>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTE:</strong> The generated names are fictitious and should only be used
          for testing, development or entertainment purposes.
        </p>
      </div>
    </>
  ),
};

export default function GenerateNames() {
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [gender, setGender] = useState<Gender>("male");
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
    toast({ title: uiCopy.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.genderLabel}</Label>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={gender === "male" ? "default" : "secondary"}
              onClick={() => setGender("male")}
              className="flex-1"
            >
              {copy.male}
            </Button>
            <Button
              size="sm"
              variant={gender === "female" ? "default" : "secondary"}
              onClick={() => setGender("female")}
              className="flex-1"
            >
              {copy.female}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} className="px-8">{copy.generate}</Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!output} className="gap-2">
            <Copy className="h-4 w-4" /> {copy.copy}
          </Button>
        </div>
      </div>

      {output && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm font-medium text-muted-foreground mb-2">{copy.generatedName}</p>
          <p className="text-xl font-semibold text-foreground tracking-wide">{output}</p>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="gerar-nomes" />

        <RelatedTools ids={["gerar-cpf", "gerar-cnpj", "gerar-numeros", "sorteador-de-nomes", "gerar-lorem", "gerar-rg", "gerar-cnh"]} />
      </div>
    </div>
  );
}
