import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { generateRGSP } from "@/lib/rg-sp";

const pt = {
  title: "Gerador de RG – SSP SP",
  intro:
    "Gere números de RG válidos no padrão SSP SP de forma rápida e prática. Escolha com ou sem pontuação e gere múltiplos registros para testes, cadastros e validações.",
  resultLabel: "RG(s) gerado(s)",
  content: (
    <>
      <ToolSection title="O que é RG?">
        <p>
          O RG (Registro Geral) é um documento de identificação civil utilizado no Brasil. Ele é emitido pelas Secretarias
          de Segurança Pública de cada estado e serve como principal identificação do cidadão em diversas situações.
        </p>
      </ToolSection>

      <ToolSection title="RG SSP SP">
        <p>
          O RG emitido em São Paulo segue o padrão da Secretaria de Segurança Pública (SSP SP). Esse modelo utiliza uma
          estrutura numérica específica com dígito verificador para garantir autenticidade e consistência dos dados.
        </p>
      </ToolSection>

      <ToolSection title="Como é formado o RG SSP SP">
        <p>
          O número do RG é composto por 9 dígitos. Os primeiros números são gerados de forma sequencial ou aleatória,
          enquanto o último dígito é um verificador calculado a partir dos anteriores, utilizando uma regra matemática que
          garante a validade do número.
        </p>
      </ToolSection>

      <ToolSection title="Para que usar um gerador de RG?">
        <ul>
          <li>Testes de sistemas</li>
          <li>Desenvolvimento de software</li>
          <li>Preenchimento de dados fictícios</li>
          <li>Simulações e validações</li>
        </ul>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTA:</strong> Os RGs gerados são fictícios e destinados exclusivamente para
          fins educacionais, testes e desenvolvimento.
        </p>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "RG Generator – SSP SP (São Paulo)",
  intro:
    "Generate valid Brazilian RG (state ID card) numbers in the São Paulo SSP SP format, quickly and easily. Choose with or without formatting and generate multiple numbers for testing, sign-up forms and validation.",
  resultLabel: "Generated RG number(s)",
  content: (
    <>
      <ToolSection title="What is an RG?">
        <p>
          The RG (Registro Geral) is Brazil's civil identity card. It is issued by the Public Security Departments
          (Secretarias de Segurança Pública) of each state and is the main form of identification for Brazilian citizens in
          many situations.
        </p>
      </ToolSection>

      <ToolSection title="RG SSP SP">
        <p>
          An RG issued in São Paulo follows the format of the state's Public Security Department (SSP SP). It uses a
          specific numeric structure with a check digit to ensure the data is authentic and consistent.
        </p>
      </ToolSection>

      <ToolSection title="How an SSP SP RG number is built">
        <p>
          The RG number has 9 characters. The first 8 digits are assigned sequentially or at random, while the last one
          is a check digit calculated from the previous digits using a mathematical rule that guarantees the number is
          valid. When the calculation results in 10, the check digit is the letter X.
        </p>
      </ToolSection>

      <ToolSection title="Why use an RG generator?">
        <ul>
          <li>Software and QA testing</li>
          <li>Application development</li>
          <li>Filling in mock data</li>
          <li>Simulations and validation checks</li>
        </ul>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTE:</strong> The generated RG numbers are fictitious and intended
          exclusively for educational, testing and development purposes.
        </p>
      </div>
    </>
  ),
};

export default function GenerateRGSP() {
  const copy = useCopy({ pt, en });
  return (
    <DocumentGenerator
      title={copy.title}
      intro={copy.intro}
      validateToolId="validar-rg"
      resultLabel={copy.resultLabel}
      generate={generateRGSP}
      toolId="gerar-rg"
      related={["validar-rg", "gerar-rj", "gerar-cpf", "gerar-cnpj", "gerar-numeros", "gerar-nomes", "gerar-lorem"]}
    >
      {copy.content}
    </DocumentGenerator>
  );
}
