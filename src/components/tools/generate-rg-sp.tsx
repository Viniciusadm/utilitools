import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { generateRGSP } from "@/lib/rg-sp";

export default function GenerateRGSP() {
  return (
    <DocumentGenerator
      title="Gerador de RG – SSP SP"
      intro="Gere números de RG válidos no padrão SSP SP de forma rápida e prática. Escolha com ou sem pontuação e gere múltiplos registros para testes, cadastros e validações."
      validateHref="/validar-rg"
      resultLabel="RG(s) gerado(s)"
      generate={generateRGSP}
      segment="gerar-rg"
      related={["validar-rg", "gerar-rj", "gerar-cpf", "gerar-cnpj", "gerar-numeros", "gerar-nomes", "gerar-lorem"]}
    >
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
    </DocumentGenerator>
  );
}
