import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { generateRENAVAM } from "@/lib/renavam";

export default function GenerateRENAVAM() {
  return (
    <DocumentGenerator
      title="Gerador de RENAVAM"
      intro="Gere números de RENAVAM válidos com 11 dígitos para testes de sistemas de veículos, despachantes e seguradoras. Gere vários de uma vez e copie com um clique."
      validateHref="/validar-renavam"
      resultLabel="RENAVAM gerado(s)"
      generate={generateRENAVAM}
      supportsPunctuation={false}
      segment="gerar-renavam"
      related={["validar-renavam", "gerar-cnh", "gerar-cpf", "gerar-cnpj"]}
    >
      <ToolSection title="O que é o RENAVAM?">
        <p>
          O RENAVAM (Registro Nacional de Veículos Automotores) é o número que identifica cada veículo no cadastro nacional
          do Senatran. Ele acompanha o veículo por toda a vida útil, mesmo quando muda de dono ou de placa, e aparece no
          CRLV, o documento do carro.
        </p>
      </ToolSection>

      <ToolSection title="Como é formado o número do RENAVAM">
        <p>
          Desde 2013, o RENAVAM tem 11 dígitos: 10 de base e 1 dígito verificador. Números antigos, com 9 dígitos, são
          completados com zeros à esquerda. O verificador é calculado multiplicando os 10 primeiros dígitos pelos pesos 3,
          2, 9, 8, 7, 6, 5, 4, 3, 2, multiplicando a soma por 10 e pegando o resto da divisão por 11. Se o resultado for
          10, o dígito é 0.
        </p>
      </ToolSection>

      <ToolSection title="Para que usar um gerador de RENAVAM?">
        <ul>
          <li>Testar sistemas de despachantes, locadoras e seguradoras</li>
          <li>Validar formulários de cadastro de veículos</li>
          <li>Popular bancos de dados de homologação</li>
        </ul>
        <p>
          <strong>Importante:</strong> os números gerados são fictícios e não correspondem a veículos reais.
        </p>
      </ToolSection>
    </DocumentGenerator>
  );
}
