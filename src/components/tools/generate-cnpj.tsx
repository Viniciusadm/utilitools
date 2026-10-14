import { useCallback, useState } from "react";
import { DocumentGenerator } from "@/components/document-generator";
import { OptionToggle } from "@/components/option-toggle";
import { ToolSection } from "@/components/tool-section";
import { generateCNPJ } from "@/lib/cnpj";

export default function GenerateCNPJ() {
  const [alphanumeric, setAlphanumeric] = useState(false);

  const generate = useCallback((punctuated: boolean) => generateCNPJ(punctuated, alphanumeric), [alphanumeric]);

  return (
    <DocumentGenerator
      title="Gerador de CNPJ"
      intro="Gerador de CNPJs válidos aleatórios, no formato numérico tradicional ou no novo CNPJ alfanumérico. Você pode escolher se quer pontuação ou não. Basta clicar em gerar e copiar o CNPJ gerado."
      validateHref="/validar-cnpj"
      resultLabel="CNPJ(s) gerado"
      generate={generate}
      segment="gerar-cnpj"
      related={["cnpj-alfanumerico", "validar-cnpj", "gerar-cpf", "gerar-numeros", "gerar-nomes", "gerar-lorem", "gerar-rg", "gerar-rj"]}
      extraControls={
        <OptionToggle
          label="Tipo"
          value={!alphanumeric}
          onChange={(numeric) => setAlphanumeric(!numeric)}
          trueLabel="Numérico"
          falseLabel="Alfanumérico"
        />
      }
    >
      <ToolSection title="O que é CNPJ?">
        <p>
          Um CNPJ (Cadastro Nacional da Pessoa Jurídica) é um número único atribuído a cada empresa e entidade legal no
          Brasil. Ele serve como um identificador único para fins fiscais e administrativos e é emitido pela Receita
          Federal. O CNPJ é essencial para que as empresas possam operar legalmente no país, realizar transações
          financeiras, emitir notas fiscais e cumprir suas obrigações tributárias.
        </p>
      </ToolSection>

      <ToolSection title="Como funciona o CNPJ?">
        <p>
          O CNPJ é um número composto por 14 dígitos, sendo os dois últimos dígitos verificadores. Os oito primeiros
          dígitos representam a identificação da empresa, os quatro dígitos seguintes são utilizados para identificar a
          unidade de atuação da empresa, e os dois últimos dígitos são os verificadores.
        </p>
      </ToolSection>

      <ToolSection title="O que é o CNPJ alfanumérico?">
        <p>
          Desde julho de 2026, a Receita Federal emite CNPJs que combinam letras e números nas 12 primeiras posições, como
          12.ABC.345/01DE-35. Os dois dígitos verificadores continuam numéricos, e os CNPJs já existentes não mudam. Saiba
          mais na página sobre o{" "}
          <a href="/cnpj-alfanumerico" className="text-primary hover:underline">
            CNPJ alfanumérico
          </a>
          .
        </p>
      </ToolSection>

      <ToolSection title="Como obter um CNPJ?">
        <p>
          Para obter um CNPJ, uma empresa deve se registrar na Receita Federal. O registro pode ser feito online ou
          pessoalmente em uma unidade da Receita Federal. O registro online é feito através do site da Receita Federal, e o
          registro presencial é feito através de um Centro Virtual de Atendimento ao Contribuinte (e-CAC).
        </p>
      </ToolSection>

      <ToolSection title="Quando foi criado o CNPJ?">
        <p>
          O CNPJ foi criado em 1998, através da Instrução Normativa SRF nº 27. A lei foi criada para substituir o antigo
          Cadastro Geral de Contribuintes (CGC), que foi criado em 1968 e era utilizado para identificar as empresas
          brasileiras.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTA:</strong> O gerador de CNPJ fornecido tem exclusivamente propósitos
          educacionais, destinando-se à avaliação de sites, softwares e outros. Os números são gerados aleatoriamente,
          respeitando as normas de formação do CNPJ. Não nos responsabilizamos por qualquer uso indevido.
        </p>
      </div>
    </DocumentGenerator>
  );
}
