import { useCallback, useState } from "react";
import { DocumentGenerator } from "@/components/document-generator";
import { OptionToggle } from "@/components/option-toggle";
import { ToolLink } from "@/components/tool-link";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { generateCNPJ } from "@/lib/cnpj";

const pt = {
  title: "Gerador de CNPJ",
  intro:
    "Gerador de CNPJs válidos aleatórios, no formato numérico tradicional ou no novo CNPJ alfanumérico. Você pode escolher se quer pontuação ou não. Basta clicar em gerar e copiar o CNPJ gerado.",
  resultLabel: "CNPJ(s) gerado",
  typeLabel: "Tipo",
  numeric: "Numérico",
  alphanumeric: "Alfanumérico",
  content: (
    <>
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
          <ToolLink id="cnpj-alfanumerico" className="text-primary hover:underline">
            CNPJ alfanumérico
          </ToolLink>
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
    </>
  ),
};

const en: typeof pt = {
  title: "CNPJ Generator",
  intro:
    "Generate random valid Brazilian CNPJ numbers for testing, in the traditional numeric format or the new alphanumeric CNPJ. Choose whether you want formatting, then click generate and copy the result.",
  resultLabel: "Generated CNPJ(s)",
  typeLabel: "Type",
  numeric: "Numeric",
  alphanumeric: "Alphanumeric",
  content: (
    <>
      <ToolSection title="What is a CNPJ?">
        <p>
          The CNPJ (Cadastro Nacional da Pessoa Jurídica) is the Brazilian company taxpayer ID, a unique number assigned
          to every business and legal entity in Brazil. It is issued by the Receita Federal (Brazil&apos;s federal tax
          authority) and is required to operate legally, make financial transactions, issue invoices (notas fiscais) and
          pay taxes. Any system that handles Brazilian companies needs a CNPJ field, and that field needs valid test data.
        </p>
      </ToolSection>

      <ToolSection title="How does a CNPJ number work?">
        <p>
          A CNPJ has 14 digits. The first eight identify the company, the next four identify the branch (0001 is the head
          office) and the last two are check digits, calculated with a modulo 11 algorithm.
        </p>
      </ToolSection>

      <ToolSection title="What is the alphanumeric CNPJ?">
        <p>
          Since July 2026, the Receita Federal has been issuing CNPJs that mix letters and numbers in the first 12
          positions, such as 12.ABC.345/01DE-35. The two check digits remain numeric, and existing CNPJs do not change.
          Learn more on the{" "}
          <ToolLink id="cnpj-alfanumerico" className="text-primary hover:underline">
            alphanumeric CNPJ
          </ToolLink>{" "}
          page.
        </p>
      </ToolSection>

      <ToolSection title="How does a company get a CNPJ?">
        <p>
          To get a CNPJ, a company must register with the Receita Federal. Registration can be done online or in person
          at a Receita Federal office. Online registration is done through the Receita Federal website and its virtual
          taxpayer service center (e-CAC).
        </p>
      </ToolSection>

      <ToolSection title="When was the CNPJ created?">
        <p>
          The CNPJ was created in 1998 by Normative Instruction SRF No. 27. It replaced the former Cadastro Geral de
          Contribuintes (CGC), which had been used since 1968 to identify Brazilian companies.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTE:</strong> This CNPJ generator is intended exclusively for educational
          purposes and for testing websites, software and similar systems. The numbers are randomly generated following
          the CNPJ formation rules. We are not responsible for any misuse.
        </p>
      </div>
    </>
  ),
};

export default function GenerateCNPJ() {
  const copy = useCopy({ pt, en });
  const [alphanumeric, setAlphanumeric] = useState(false);

  const generate = useCallback((punctuated: boolean) => generateCNPJ(punctuated, alphanumeric), [alphanumeric]);

  return (
    <DocumentGenerator
      title={copy.title}
      intro={copy.intro}
      validateToolId="validar-cnpj"
      resultLabel={copy.resultLabel}
      generate={generate}
      toolId="gerar-cnpj"
      related={["cnpj-alfanumerico", "validar-cnpj", "gerar-cpf", "gerar-numeros", "gerar-nomes", "gerar-lorem", "gerar-rg", "gerar-rj"]}
      extraControls={
        <OptionToggle
          label={copy.typeLabel}
          value={!alphanumeric}
          onChange={(numeric) => setAlphanumeric(!numeric)}
          trueLabel={copy.numeric}
          falseLabel={copy.alphanumeric}
        />
      }
    >
      {copy.content}
    </DocumentGenerator>
  );
}
