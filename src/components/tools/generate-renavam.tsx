import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { generateRENAVAM } from "@/lib/renavam";

const pt = {
  title: "Gerador de RENAVAM",
  intro:
    "Gere números de RENAVAM válidos com 11 dígitos para testes de sistemas de veículos, despachantes e seguradoras. Gere vários de uma vez e copie com um clique.",
  resultLabel: "RENAVAM gerado(s)",
  content: (
    <>
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
    </>
  ),
};

const en: typeof pt = {
  title: "RENAVAM Generator",
  intro:
    "Generate valid 11-digit Brazilian RENAVAM numbers (national vehicle registration IDs) to test vehicle, car rental and insurance systems. Generate several at once and copy them with one click.",
  resultLabel: "Generated RENAVAM number(s)",
  content: (
    <>
      <ToolSection title="What is RENAVAM?">
        <p>
          RENAVAM (Registro Nacional de Veículos Automotores) is the number that identifies each vehicle in Brazil's
          national vehicle registry, managed by Senatran. It stays with the vehicle for its entire life, even when the
          owner or license plate changes, and it is printed on the CRLV, the vehicle registration document.
        </p>
      </ToolSection>

      <ToolSection title="How a RENAVAM number is built">
        <p>
          Since 2013, RENAVAM has 11 digits: 10 base digits and 1 check digit. Older 9-digit numbers are padded with
          leading zeros. The check digit is calculated by multiplying the first 10 digits by the weights 3, 2, 9, 8, 7, 6,
          5, 4, 3, 2, multiplying the sum by 10 and taking the remainder of the division by 11. If the result is 10, the
          digit is 0.
        </p>
      </ToolSection>

      <ToolSection title="Why use a RENAVAM generator?">
        <ul>
          <li>Test systems for vehicle registration services, car rental companies and insurers</li>
          <li>Validate vehicle registration forms</li>
          <li>Seed staging and QA databases</li>
        </ul>
        <p>
          <strong>Important:</strong> the generated numbers are fictitious and do not belong to real vehicles.
        </p>
      </ToolSection>
    </>
  ),
};

export default function GenerateRENAVAM() {
  const copy = useCopy({ pt, en });
  return (
    <DocumentGenerator
      title={copy.title}
      intro={copy.intro}
      validateToolId="validar-renavam"
      resultLabel={copy.resultLabel}
      generate={generateRENAVAM}
      supportsPunctuation={false}
      toolId="gerar-renavam"
      related={["validar-renavam", "gerar-cnh", "gerar-cpf", "gerar-cnpj"]}
    >
      {copy.content}
    </DocumentGenerator>
  );
}
