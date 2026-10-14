import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { generatePIS } from "@/lib/pis";

export default function GeneratePIS() {
  return (
    <DocumentGenerator
      title="Gerador de PIS/PASEP"
      intro="Gere números de PIS/PASEP/NIS válidos para testes de software, com ou sem pontuação. Gere vários de uma vez e copie com um clique."
      validateHref="/validar-pis"
      resultLabel="PIS gerado(s)"
      generate={generatePIS}
      segment="gerar-pis"
      related={["validar-pis", "gerar-cpf", "gerar-titulo-de-eleitor", "gerar-cnh"]}
    >
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
    </DocumentGenerator>
  );
}
