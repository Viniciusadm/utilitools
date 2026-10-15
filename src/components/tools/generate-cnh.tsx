import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { generateCNH } from "@/lib/cnh";

const pt = {
  title: "Gerador de CNH",
  intro:
    "Gerador de CNH online gratuito. Crie números de CNH aleatórios para fins educacionais e teste de sistemas. Copie facilmente o número gerado com apenas um clique.",
  resultLabel: "CNH(s) gerada(s)",
  content: (
    <>
      <ToolSection title="O que é CNH?">
        <p>
          A CNH – Carteira Nacional de Habilitação é o documento oficial que autoriza o titular a conduzir veículos
          automotores, emitido pelo órgão de trânsito. Ela garante que o condutor possui conhecimento e capacidade para
          dirigir veículos de acordo com a legislação, e é dividida por categorias: automóveis, motocicletas e veículos
          pesados.
        </p>
      </ToolSection>

      <ToolSection title="Como é formado o número da CNH?">
        <p>
          O número da CNH é composto por nove dígitos aleatórios e dois dígitos verificadores (DV1 e DV2). Os nove dígitos
          iniciais são escolhidos aleatoriamente. O DV1 é calculado com base na soma ponderada desses dígitos, garantindo
          que o resultado fique entre 0 e 9. O DV2 é calculado de forma semelhante, levando em conta o DV1. Os dígitos
          verificadores asseguram autenticidade e integridade, evitando falsificações.
        </p>
      </ToolSection>

      <ToolSection title="Como usar">
        <ol>
          <li>Escolha o separador: quebra de linha ou vírgula.</li>
          <li>Defina a quantidade de CNHs a gerar (1–100).</li>
          <li>Clique em Gerar.</li>
          <li>Copie o(s) número(s) gerado(s) clicando em Copiar.</li>
        </ol>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTA:</strong> Este gerador é apenas para fins educacionais, avaliação de
          softwares e testes de sites. Os números gerados são aleatórios e seguem as regras matemáticas reais de validação
          da CNH, porém não correspondem a pessoas reais. Não nos responsabilizamos pelo uso indevido desta ferramenta.
        </p>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "CNH Generator",
  intro:
    "Free online CNH generator. Create random valid Brazilian driver's license (CNH) numbers for education and software testing, and copy them with a single click.",
  resultLabel: "Generated CNH number(s)",
  content: (
    <>
      <ToolSection title="What is a CNH?">
        <p>
          The CNH (Carteira Nacional de Habilitação) is the Brazilian driver&apos;s license, the official document that
          allows its holder to drive motor vehicles. It is issued by the state traffic departments (Detran) and is divided
          into categories such as cars, motorcycles and heavy vehicles. Its 11-digit registration number (número de
          registro) is a common field in Brazilian insurance, rental, ride-hailing and logistics systems.
        </p>
      </ToolSection>

      <ToolSection title="How is a CNH number formed?">
        <p>
          A CNH number is made up of nine random digits followed by two check digits (DV1 and DV2). DV1 is calculated
          from a weighted sum of the first nine digits, keeping the result between 0 and 9. DV2 is calculated in a
          similar way. The check digits let systems detect typos and reject made-up numbers.
        </p>
      </ToolSection>

      <ToolSection title="How to use">
        <ol>
          <li>Choose the separator: line break or comma.</li>
          <li>Set how many CNH numbers to generate (1–100).</li>
          <li>Click Generate.</li>
          <li>Copy the generated number(s) by clicking Copy.</li>
        </ol>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTE:</strong> This generator is intended only for educational purposes and
          for testing software and websites. The numbers are random and follow the real CNH validation rules, but they do
          not belong to real people. We are not responsible for any misuse of this tool.
        </p>
      </div>
    </>
  ),
};

export default function GenerateCNH() {
  const copy = useCopy({ pt, en });
  return (
    <DocumentGenerator
      title={copy.title}
      intro={copy.intro}
      validateToolId="validar-cnh"
      resultLabel={copy.resultLabel}
      generate={generateCNH}
      supportsPunctuation={false}
      toolId="gerar-cnh"
      related={["validar-cnh", "gerar-renavam", "gerar-cpf", "gerar-cnpj", "gerar-numeros", "gerar-nomes", "gerar-lorem", "gerar-rg"]}
    >
      {copy.content}
    </DocumentGenerator>
  );
}
