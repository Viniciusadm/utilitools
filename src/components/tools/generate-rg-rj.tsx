import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { generateRG } from "@/lib/rg";

const pt = {
  title: "Gerador de RG – IFP RJ",
  intro:
    "Gere números de RG válidos no padrão IFP RJ de forma rápida e prática. Escolha com ou sem pontuação e gere múltiplos registros para testes, cadastros e validações.",
  resultLabel: "RG(s) gerado(s)",
  content: (
    <>
      <ToolSection title="O que é RG?">
        <p>
          O RG (Registro Geral) é um documento de identificação civil utilizado no Brasil. Ele contém informações pessoais
          como nome, data de nascimento e número único de identificação, sendo essencial para diversos processos e
          cadastros.
        </p>
      </ToolSection>

      <ToolSection title="RG IFP RJ">
        <p>
          O RG emitido no estado do Rio de Janeiro segue o padrão do Instituto Félix Pacheco (IFP RJ). Esse modelo possui
          uma estrutura numérica específica com dígito verificador, garantindo maior segurança e validação dos dados.
        </p>
      </ToolSection>

      <ToolSection title="Como é formado o RG IFP RJ">
        <p>
          O número do RG é composto por 9 dígitos. Os primeiros números são gerados de forma sequencial ou aleatória,
          enquanto o último é um dígito verificador calculado a partir dos anteriores, garantindo a validade do documento.
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
  title: "RG Generator – IFP RJ (Rio de Janeiro)",
  intro:
    "Generate valid Brazilian RG (state ID card) numbers in the Rio de Janeiro IFP RJ format, quickly and easily. Choose with or without formatting and generate multiple numbers for testing, sign-up forms and validation.",
  resultLabel: "Generated RG number(s)",
  content: (
    <>
      <ToolSection title="What is an RG?">
        <p>
          The RG (Registro Geral) is Brazil's civil identity card. It holds personal information such as name, date of
          birth and a unique identification number, and it is required for many procedures and registrations in Brazil.
        </p>
      </ToolSection>

      <ToolSection title="RG IFP RJ">
        <p>
          An RG issued in the state of Rio de Janeiro follows the format of the Instituto Félix Pacheco (IFP RJ). It uses a
          specific numeric structure with a check digit, which makes the data more secure and easier to validate.
        </p>
      </ToolSection>

      <ToolSection title="How an IFP RJ RG number is built">
        <p>
          The RG number has 9 digits. The first 8 are assigned sequentially or at random, while the last one is a check
          digit calculated from the previous ones, which guarantees the number is valid.
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

export default function GenerateRGRJ() {
  const copy = useCopy({ pt, en });
  return (
    <DocumentGenerator
      title={copy.title}
      intro={copy.intro}
      validateToolId="validar-rj"
      resultLabel={copy.resultLabel}
      generate={generateRG}
      toolId="gerar-rj"
      related={["validar-rj", "gerar-rg", "gerar-cpf", "gerar-cnpj", "gerar-numeros", "gerar-nomes", "gerar-lorem", "gerar-cnh"]}
    >
      {copy.content}
    </DocumentGenerator>
  );
}
