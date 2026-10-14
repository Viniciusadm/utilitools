import { DocumentValidator } from "@/components/document-validator";
import { ToolSection } from "@/components/tool-section";
import { onlyDigits } from "@/lib/check-digit";
import { isValidPIS } from "@/lib/pis";

export default function ValidatePIS() {
  return (
    <DocumentValidator
      title="Validar PIS/PASEP"
      intro="Verifique se um número de PIS, PASEP, NIS ou NIT é válido pelo cálculo do dígito verificador. Digite com ou sem pontuação."
      generateHref="/gerar-pis"
      documentName="PIS"
      placeholder="000.00000.00-0"
      maxLength={14}
      isComplete={(value) => onlyDigits(value).length === 11}
      validate={(value) => ({ valid: isValidPIS(value) })}
      segment="validar-pis"
      related={["gerar-pis", "validar-cpf", "validar-titulo-de-eleitor", "validar-cnh"]}
    >
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
    </DocumentValidator>
  );
}
