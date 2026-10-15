import { DocumentValidator } from "@/components/document-validator";
import { ToolSection } from "@/components/tool-section";
import { onlyDigits } from "@/lib/check-digit";
import { useCopy } from "@/lib/i18n";
import { isValidPIS } from "@/lib/pis";

const pt = {
  title: "Validar PIS/PASEP",
  intro:
    "Verifique se um número de PIS, PASEP, NIS ou NIT é válido pelo cálculo do dígito verificador. Digite com ou sem pontuação.",
  content: (
    <>
      <ToolSection title="Como validar o PIS">
        <ol>
          <li>Multiplique os 10 primeiros dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2.</li>
          <li>Some os resultados e calcule o resto da divisão por 11.</li>
          <li>Se o resto for 0 ou 1, o dígito verificador é 0. Senão, é 11 menos o resto.</li>
          <li>Compare com o último dígito do número informado.</li>
        </ol>
      </ToolSection>

      <ToolSection title="PIS, PASEP, NIS e NIT são a mesma coisa?">
        <p>
          São cadastros diferentes, mas usam o mesmo formato e o mesmo cálculo de dígito verificador. Por isso, este
          validador funciona para qualquer um deles. Hoje o CPF também é aceito no lugar do PIS em muitos serviços, como a
          Carteira de Trabalho Digital.
        </p>
      </ToolSection>

      <ToolSection title="Onde encontrar o número do PIS">
        <ul>
          <li>Na Carteira de Trabalho Digital ou física</li>
          <li>No aplicativo FGTS ou Caixa Tem</li>
          <li>No extrato do FGTS ou no cartão Cidadão</li>
          <li>No aplicativo Meu INSS</li>
        </ul>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "PIS/PASEP Validator",
  intro:
    "Check whether a Brazilian PIS, PASEP, NIS or NIT number is valid by calculating its check digit. Type it with or without formatting.",
  content: (
    <>
      <ToolSection title="How to validate a PIS number">
        <ol>
          <li>Multiply the first 10 digits by the weights 3, 2, 9, 8, 7, 6, 5, 4, 3, 2.</li>
          <li>Add up the results and take the remainder of the division by 11.</li>
          <li>If the remainder is 0 or 1, the check digit is 0. Otherwise, it is 11 minus the remainder.</li>
          <li>Compare it with the last digit of the number.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Are PIS, PASEP, NIS and NIT the same thing?">
        <p>
          They are different Brazilian registries, but they share the same format and the same check digit calculation.
          That is why this validator works for all of them. Today the CPF is also accepted instead of the PIS in many
          services, such as the Digital Work Card (Carteira de Trabalho Digital).
        </p>
      </ToolSection>

      <ToolSection title="Where to find a PIS number">
        <ul>
          <li>On the digital or printed Work Card (Carteira de Trabalho)</li>
          <li>In the FGTS or Caixa Tem apps</li>
          <li>On the FGTS statement or the Cidadão card</li>
          <li>In the Meu INSS app</li>
        </ul>
      </ToolSection>
    </>
  ),
};

export default function ValidatePIS() {
  const copy = useCopy({ pt, en });
  return (
    <DocumentValidator
      title={copy.title}
      intro={copy.intro}
      generateToolId="gerar-pis"
      documentName="PIS"
      placeholder="000.00000.00-0"
      maxLength={14}
      isComplete={(value) => onlyDigits(value).length === 11}
      validate={(value) => ({ valid: isValidPIS(value) })}
      toolId="validar-pis"
      related={["gerar-pis", "validar-cpf", "validar-titulo-de-eleitor", "validar-cnh"]}
    >
      {copy.content}
    </DocumentValidator>
  );
}
