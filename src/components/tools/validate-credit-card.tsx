import { DocumentValidator } from "@/components/document-validator";
import { ToolSection } from "@/components/tool-section";
import { onlyDigits } from "@/lib/check-digit";
import { validateCard } from "@/lib/credit-card";

function validate(value: string) {
  const { valid, brand } = validateCard(value);
  const brandText = brand ? `Bandeira identificada: ${brand.name}.` : "Bandeira não identificada.";
  return {
    valid,
    detail: valid ? `${brandText} O número passa no algoritmo de Luhn.` : `${brandText} O número não passa na verificação.`,
  };
}

export default function ValidateCreditCard() {
  return (
    <DocumentValidator
      title="Validar Cartão de Crédito"
      intro="Verifique se um número de cartão de crédito é válido pelo algoritmo de Luhn e descubra a bandeira: Visa, Mastercard, Elo, American Express, Hipercard ou Diners."
      generateHref="/gerar-cartao-de-credito"
      documentName="Cartão"
      placeholder="0000 0000 0000 0000"
      maxLength={23}
      isComplete={(value) => onlyDigits(value).length >= 12}
      validate={validate}
      segment="validar-cartao-de-credito"
      related={["gerar-cartao-de-credito", "validar-cpf", "validar-cnpj", "gerador-de-senha"]}
    >
      <ToolSection title="Como funciona a validação do cartão">
        <ol>
          <li>Da direita para a esquerda, dobre cada segundo dígito.</li>
          <li>Se o dobro passar de 9, subtraia 9.</li>
          <li>Some todos os dígitos.</li>
          <li>Se a soma for múltipla de 10, o número é válido.</li>
        </ol>
        <p>
          Além disso, a ferramenta confere se a quantidade de dígitos bate com a bandeira identificada pelos primeiros
          números.
        </p>
      </ToolSection>

      <ToolSection title="Como identificar a bandeira do cartão">
        <ul>
          <li>
            <strong>Visa:</strong> começa com 4 (16 dígitos)
          </li>
          <li>
            <strong>Mastercard:</strong> começa com 51 a 55 ou 2221 a 2720 (16 dígitos)
          </li>
          <li>
            <strong>American Express:</strong> começa com 34 ou 37 (15 dígitos)
          </li>
          <li>
            <strong>Elo:</strong> faixas próprias, como 636368, 438935 e 504175 (16 dígitos)
          </li>
          <li>
            <strong>Hipercard:</strong> começa com 606282 (16 dígitos)
          </li>
          <li>
            <strong>Diners Club:</strong> começa com 36, 38 ou 300 a 305 (14 dígitos)
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="A validação é segura?">
        <p>
          Sim. O cálculo é feito no seu navegador e o número não é enviado para nenhum servidor. Ainda assim, evite digitar
          dados completos de cartões reais em sites que você não conhece.
        </p>
      </ToolSection>
    </DocumentValidator>
  );
}
