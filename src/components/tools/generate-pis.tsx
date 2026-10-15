import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { generatePIS } from "@/lib/pis";

const pt = {
  title: "Gerador de PIS/PASEP",
  intro:
    "Gere números de PIS/PASEP/NIS válidos para testes de software, com ou sem pontuação. Gere vários de uma vez e copie com um clique.",
  resultLabel: "PIS gerado(s)",
  content: (
    <>
      <ToolSection title="O que é PIS/PASEP?">
        <p>
          O PIS (Programa de Integração Social) e o PASEP (Programa de Formação do Patrimônio do Servidor Público) são
          cadastros que identificam o trabalhador para benefícios como abono salarial, FGTS e seguro-desemprego. O PIS é
          usado por trabalhadores da iniciativa privada e o PASEP por servidores públicos. Os dois, junto com o NIS e o
          NIT, seguem o mesmo formato de 11 dígitos.
        </p>
      </ToolSection>

      <ToolSection title="Como é formado o número do PIS">
        <p>
          O número tem 10 dígitos de base e 1 dígito verificador, no formato 000.00000.00-0. O verificador é calculado
          multiplicando os 10 primeiros dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, somando os resultados e
          calculando o resto da divisão por 11. Se o resto for 0 ou 1, o dígito é 0; caso contrário, é 11 menos o resto.
        </p>
      </ToolSection>

      <ToolSection title="Para que usar um gerador de PIS?">
        <ul>
          <li>Testar sistemas de folha de pagamento e RH</li>
          <li>Validar formulários de cadastro de funcionários</li>
          <li>Popular bancos de dados de homologação</li>
        </ul>
        <p>
          <strong>Importante:</strong> os números são fictícios e não devem ser usados para cadastros reais.
        </p>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "PIS/PASEP Generator",
  intro:
    "Generate valid Brazilian PIS/PASEP/NIS numbers (worker social security IDs) for software testing, with or without formatting. Generate several at once and copy them with one click.",
  resultLabel: "Generated PIS number(s)",
  content: (
    <>
      <ToolSection title="What is PIS/PASEP?">
        <p>
          PIS (Programa de Integração Social) and PASEP (Programa de Formação do Patrimônio do Servidor Público) are
          Brazilian registries that identify workers for benefits such as the salary bonus (abono salarial), FGTS and
          unemployment insurance. PIS is used by private-sector employees and PASEP by public servants. Both, along with
          NIS and NIT, share the same 11-digit format.
        </p>
      </ToolSection>

      <ToolSection title="How a PIS number is built">
        <p>
          The number has 10 base digits and 1 check digit, in the format 000.00000.00-0. The check digit is calculated by
          multiplying the first 10 digits by the weights 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, adding up the results and taking
          the remainder of the division by 11. If the remainder is 0 or 1, the digit is 0; otherwise, it is 11 minus the
          remainder.
        </p>
      </ToolSection>

      <ToolSection title="Why use a PIS generator?">
        <ul>
          <li>Test payroll and HR systems</li>
          <li>Validate employee sign-up forms</li>
          <li>Seed staging and QA databases</li>
        </ul>
        <p>
          <strong>Important:</strong> the numbers are fictitious and must not be used for real registrations.
        </p>
      </ToolSection>
    </>
  ),
};

export default function GeneratePIS() {
  const copy = useCopy({ pt, en });
  return (
    <DocumentGenerator
      title={copy.title}
      intro={copy.intro}
      validateToolId="validar-pis"
      resultLabel={copy.resultLabel}
      generate={generatePIS}
      toolId="gerar-pis"
      related={["validar-pis", "gerar-cpf", "gerar-titulo-de-eleitor", "gerar-cnh"]}
    >
      {copy.content}
    </DocumentGenerator>
  );
}
