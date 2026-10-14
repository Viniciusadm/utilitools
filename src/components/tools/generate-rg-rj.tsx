import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { generateRG } from "@/lib/rg";

export default function GenerateRGRJ() {
  return (
    <DocumentGenerator
      title="Gerador de RG – IFP RJ"
      intro="Gere números de RG válidos no padrão IFP RJ de forma rápida e prática. Escolha com ou sem pontuação e gere múltiplos registros para testes, cadastros e validações."
      validateHref="/validar-rj"
      resultLabel="RG(s) gerado(s)"
      generate={generateRG}
      segment="gerar-rj"
      related={["validar-rj", "gerar-rg", "gerar-cpf", "gerar-cnpj", "gerar-numeros", "gerar-nomes", "gerar-lorem", "gerar-cnh"]}
    >
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
    </DocumentGenerator>
  );
}
