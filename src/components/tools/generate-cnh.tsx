import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { generateCNH } from "@/lib/cnh";

export default function GenerateCNH() {
  return (
    <DocumentGenerator
      title="Gerador de CNH"
      intro="Gerador de CNH online gratuito. Crie números de CNH aleatórios para fins educacionais e teste de sistemas. Copie facilmente o número gerado com apenas um clique."
      validateHref="/validar-cnh"
      resultLabel="CNH(s) gerada(s)"
      generate={generateCNH}
      supportsPunctuation={false}
      segment="gerar-cnh"
      related={["validar-cnh", "gerar-renavam", "gerar-cpf", "gerar-cnpj", "gerar-numeros", "gerar-nomes", "gerar-lorem", "gerar-rg"]}
    >
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
    </DocumentGenerator>
  );
}
