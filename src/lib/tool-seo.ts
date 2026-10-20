import type { Locale } from "@/lib/i18n";
import { TOOL_SEO_EN } from "@/lib/tool-seo-en";

export type FaqItem = {
  question: string;
  answer: string;
};

export type ToolSeo = {
  title: string;
  description: string;
  faq: readonly FaqItem[];
};

export const TOOL_SEO: Readonly<Record<string, ToolSeo>> = {
  "gerador-de-qr-code-pix": {
    title: "Gerador de QR Code Pix Grátis e Pix Copia e Cola",
    description:
      "Gere QR Code Pix e código Pix copia e cola grátis, com ou sem valor. Baixe o QR Code em PNG para receber pagamentos. Nada é enviado para servidores.",
    faq: [
      {
        question: "Gerar QR Code Pix aqui é seguro?",
        answer:
          "Sim. O QR Code é gerado no seu navegador e nenhum dado é enviado ou armazenado. O dinheiro vai direto para a conta da chave Pix informada, sem intermediários.",
      },
      {
        question: "O QR Code Pix tem validade?",
        answer:
          "Não. O QR Code gerado é estático: pode ser usado quantas vezes quiser e não expira enquanto a chave Pix estiver cadastrada.",
      },
      {
        question: "Posso gerar um QR Code Pix com valor definido?",
        answer:
          "Sim. Preencha o campo Valor e o pagador só precisa confirmar. Deixe em branco para que ele digite o valor no aplicativo do banco.",
      },
      {
        question: "O que é o Pix copia e cola?",
        answer:
          "É o mesmo conteúdo do QR Code em forma de texto. A pessoa cola o código na área Pix do aplicativo do banco para pagar, útil quando não dá para escanear.",
      },
      {
        question: "Por que o nome aparece sem acento?",
        answer:
          "O padrão do Pix (BR Code) aceita apenas caracteres sem acento e limita o nome a 25 caracteres e a cidade a 15. O ajuste é feito automaticamente.",
      },
    ],
  },
  "calculadora-de-juros-compostos": {
    title: "Calculadora de Juros Compostos com Aporte Mensal",
    description:
      "Simule juros compostos com valor inicial, aporte mensal e taxa ao mês ou ao ano. Veja o valor final, os juros ganhos e a evolução ano a ano.",
    faq: [
      {
        question: "Qual a fórmula dos juros compostos?",
        answer:
          "M = C × (1 + i)ⁿ, em que M é o montante, C o capital inicial, i a taxa por período e n o número de períodos. Com aportes, cada depósito rende pelo tempo que fica aplicado.",
      },
      {
        question: "Qual a diferença entre juros simples e compostos?",
        answer:
          "Nos juros simples, os juros incidem só sobre o valor inicial. Nos compostos, incidem sobre o saldo acumulado, incluindo os juros anteriores, o que faz o dinheiro crescer mais rápido com o tempo.",
      },
      {
        question: "Como converter taxa anual em mensal?",
        answer:
          "Use (1 + taxa anual)^(1/12) − 1. Por exemplo, 12% ao ano equivale a cerca de 0,95% ao mês. A calculadora faz essa conversão quando você escolhe taxa ao ano.",
      },
      {
        question: "A simulação considera imposto de renda?",
        answer:
          "Não. O resultado é bruto, sem imposto de renda, taxas ou inflação. O valor líquido depende do tipo de investimento e do prazo.",
      },
    ],
  },
  "calculadora-imc": {
    title: "Calculadora de IMC: Índice de Massa Corporal",
    description:
      "Calcule seu IMC online com peso e altura e veja a classificação da OMS: abaixo do peso, normal, sobrepeso ou obesidade. Veja também seu peso ideal.",
    faq: [
      {
        question: "Como calcular o IMC?",
        answer: "Divida o peso em quilos pela altura em metros ao quadrado. Com 70 kg e 1,75 m, o IMC é 70 ÷ 3,0625 = 22,9.",
      },
      {
        question: "Qual é o IMC ideal?",
        answer: "Para adultos, a OMS considera peso normal o IMC entre 18,5 e 24,9.",
      },
      {
        question: "Como saber meu peso ideal pela altura?",
        answer:
          "Multiplique sua altura ao quadrado por 18,5 e por 24,9. Os dois resultados formam a faixa de peso saudável. A calculadora mostra essa faixa automaticamente.",
      },
      {
        question: "O IMC vale para crianças e idosos?",
        answer:
          "Não. A tabela é para adultos. Crianças e adolescentes usam curvas de crescimento por idade, e idosos têm faixas de referência diferentes.",
      },
    ],
  },
  "calcular-dias-uteis": {
    title: "Calcular Dias Úteis Entre Datas e Prazos",
    description:
      "Calcule quantos dias úteis há entre duas datas ou some dias úteis a uma data para saber o prazo final, descontando fins de semana e feriados nacionais.",
    faq: [
      {
        question: "Como calcular dias úteis entre duas datas?",
        answer:
          "Conte os dias do período e retire sábados, domingos e feriados que caem em dias de semana. A calculadora faz isso automaticamente e lista os feriados encontrados.",
      },
      {
        question: "Sábado é dia útil?",
        answer:
          "Para prazos processuais e bancários, não. Em algumas regras trabalhistas o sábado pode ser considerado dia útil, então confira a regra do seu caso. Esta calculadora não conta o sábado.",
      },
      {
        question: "Carnaval é feriado nacional?",
        answer:
          "Não. Carnaval e Corpus Christi são pontos facultativos no âmbito federal, mas muitos estados, cidades e empresas não trabalham nessas datas. Você pode escolher se eles devem ser descontados.",
      },
      {
        question: "A calculadora considera feriados estaduais e municipais?",
        answer:
          "Não. Ela considera apenas os feriados nacionais. Desconte manualmente os feriados da sua cidade ou estado.",
      },
      {
        question: "A data inicial entra na contagem?",
        answer:
          "Na contagem entre datas, a inicial e a final entram. Ao somar dias úteis, a contagem começa no dia útil seguinte à data de início, como nos prazos.",
      },
    ],
  },
  "gerar-cartao-de-credito": {
    title: "Gerador de Cartão de Crédito Válido para Testes",
    description:
      "Gere números de cartão de crédito válidos para testes, com bandeira Visa, Mastercard, Elo, Amex, Hipercard ou Diners, data de validade e CVV.",
    faq: [
      {
        question: "Os cartões gerados funcionam para fazer compras?",
        answer:
          "Não. Os números apenas passam no algoritmo de Luhn. Eles não estão ligados a nenhum banco, não têm saldo e são recusados em qualquer compra real.",
      },
      {
        question: "Para que serve um cartão de crédito gerado?",
        answer:
          "Para testar formulários de pagamento, máscaras, identificação de bandeira e validações no front-end durante o desenvolvimento de software.",
      },
      {
        question: "Quais bandeiras posso gerar?",
        answer: "Visa, Mastercard, Elo, American Express, Hipercard e Diners Club.",
      },
      {
        question: "Posso usar para testar meu gateway de pagamento?",
        answer:
          "Para testes de ponta a ponta, use os números de teste oficiais do seu gateway (como Stripe, Mercado Pago ou PagSeguro), que simulam aprovações e recusas no ambiente de testes.",
      },
    ],
  },
  "validar-cartao-de-credito": {
    title: "Validar Cartão de Crédito e Descobrir a Bandeira",
    description:
      "Verifique se o número de um cartão de crédito é válido pelo algoritmo de Luhn e descubra a bandeira. Grátis, sem envio de dados e direto no navegador.",
    faq: [
      {
        question: "Como saber se um número de cartão é válido?",
        answer:
          "O último dígito do cartão é calculado pelo algoritmo de Luhn. Se a verificação bate e a quantidade de dígitos corresponde à bandeira, o número é válido.",
      },
      {
        question: "Um número válido significa que o cartão tem limite?",
        answer:
          "Não. A validação confere apenas se o número é matematicamente correto. Limite, situação e titularidade só podem ser verificados pelo banco emissor.",
      },
      {
        question: "Como descobrir a bandeira do cartão pelo número?",
        answer:
          "Pelos primeiros dígitos, chamados de BIN. Visa começa com 4, Mastercard com 51 a 55 ou 2221 a 2720, American Express com 34 ou 37 e Elo e Hipercard têm faixas próprias.",
      },
      {
        question: "É seguro validar um cartão aqui?",
        answer: "O cálculo é feito no seu navegador e o número não é enviado para nenhum servidor.",
      },
    ],
  },
  "gerar-pis": {
    title: "Gerador de PIS/PASEP Válido Online",
    description:
      "Gere números de PIS, PASEP e NIS válidos para testes de sistemas de RH e folha de pagamento, com ou sem pontuação. Gere vários de uma vez.",
    faq: [
      {
        question: "O PIS gerado pertence a um trabalhador real?",
        answer:
          "Não. Os números são aleatórios e apenas passam no cálculo do dígito verificador. Servem somente para testes de software.",
      },
      {
        question: "Qual o formato do número do PIS?",
        answer: "São 11 dígitos no formato 000.00000.00-0, sendo o último o dígito verificador.",
      },
      {
        question: "O gerador também serve para NIS e PASEP?",
        answer: "Sim. PIS, PASEP, NIS e NIT usam o mesmo formato e o mesmo cálculo de dígito verificador.",
      },
    ],
  },
  "validar-pis": {
    title: "Validar PIS/PASEP/NIS Online",
    description:
      "Verifique se um número de PIS, PASEP, NIS ou NIT é válido pelo cálculo do dígito verificador. Digite com ou sem pontuação e veja o resultado na hora.",
    faq: [
      {
        question: "Como saber se um PIS é válido?",
        answer:
          "Multiplique os 10 primeiros dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 e calcule o resto da divisão por 11. O dígito verificador é 0 se o resto for 0 ou 1, e 11 menos o resto nos demais casos.",
      },
      {
        question: "O validador consulta o PIS na Caixa?",
        answer:
          "Não. A ferramenta confere apenas se o número é matematicamente válido. Para consultar benefícios, use o aplicativo FGTS, Caixa Tem ou a Carteira de Trabalho Digital.",
      },
      {
        question: "PIS e NIS são o mesmo número?",
        answer:
          "Para quem tem cadastro no PIS, o NIS costuma ser o mesmo número. Ambos usam o mesmo formato e podem ser validados aqui.",
      },
    ],
  },
  "gerar-titulo-de-eleitor": {
    title: "Gerador de Título de Eleitor Válido por Estado",
    description:
      "Gere números de título de eleitor válidos para testes, escolhendo o estado de emissão, com ou sem formatação. Gere vários de uma vez e copie com um clique.",
    faq: [
      {
        question: "O título gerado é de um eleitor real?",
        answer:
          "Não. O número é aleatório e só passa no cálculo dos dígitos verificadores. Ele serve para testes de software.",
      },
      {
        question: "Posso gerar título de um estado específico?",
        answer:
          "Sim. Escolha o estado antes de gerar. O 9º e o 10º dígitos do título indicam a unidade da federação de emissão.",
      },
      {
        question: "Quantos dígitos tem o título de eleitor?",
        answer: "12 dígitos: 8 sequenciais, 2 do código do estado e 2 dígitos verificadores.",
      },
    ],
  },
  "validar-titulo-de-eleitor": {
    title: "Validar Título de Eleitor e Ver o Estado",
    description:
      "Verifique se um número de título de eleitor é válido pelo cálculo dos dígitos verificadores e descubra em qual estado ele foi emitido.",
    faq: [
      {
        question: "Como saber se um título de eleitor é válido?",
        answer:
          "Os dois últimos dígitos são verificadores, calculados a partir dos 8 primeiros e do código do estado. Se os dois batem, o número é válido.",
      },
      {
        question: "Como saber de qual estado é o título?",
        answer:
          "Pelo 9º e 10º dígitos: 01 é São Paulo, 02 Minas Gerais, 03 Rio de Janeiro e assim por diante, até 28 para eleitores no exterior. O validador mostra o estado automaticamente.",
      },
      {
        question: "O validador mostra se o título está regular?",
        answer:
          "Não. Ele confere apenas o número. A situação eleitoral é consultada no site do TSE ou no aplicativo e-Título.",
      },
    ],
  },
  "gerar-renavam": {
    title: "Gerador de RENAVAM Válido Online",
    description:
      "Gere números de RENAVAM válidos com 11 dígitos para testes de sistemas de veículos, despachantes e seguradoras. Gere vários de uma vez.",
    faq: [
      {
        question: "O RENAVAM gerado é de um veículo real?",
        answer:
          "Não. O número é aleatório e passa apenas no cálculo do dígito verificador. Ele serve para testes de software.",
      },
      {
        question: "Quantos dígitos tem o RENAVAM?",
        answer:
          "Desde 2013 o RENAVAM tem 11 dígitos. Números antigos, de 9 dígitos, são completados com dois zeros à esquerda.",
      },
    ],
  },
  "validar-renavam": {
    title: "Validar RENAVAM Online",
    description:
      "Verifique se um número de RENAVAM é válido pelo cálculo do dígito verificador. Aceita o formato atual de 11 dígitos e o antigo de 9.",
    faq: [
      {
        question: "Como saber se o RENAVAM é válido?",
        answer:
          "Multiplique os 10 primeiros dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, multiplique a soma por 10 e calcule o resto por 11. Se o resultado, com 10 virando 0, for igual ao último dígito, o RENAVAM é válido.",
      },
      {
        question: "O validador consulta débitos do veículo?",
        answer:
          "Não. Ele confere apenas se o número está correto. Débitos, IPVA e licenciamento são consultados no site do Detran do seu estado.",
      },
      {
        question: "Meu RENAVAM tem 9 dígitos. Ele é válido?",
        answer: "Pode ser. RENAVAMs antigos têm 9 dígitos e são validados completando com dois zeros à esquerda.",
      },
    ],
  },
  "cnpj-alfanumerico": {
    title: "CNPJ Alfanumérico: Validar, Gerar e Calcular o DV",
    description:
      "Valide e gere CNPJ alfanumérico online. Entenda o novo formato com letras da Receita Federal (IN RFB 2.229/2024) e veja como calcular o dígito verificador.",
    faq: [
      {
        question: "Quando o CNPJ alfanumérico começou a valer?",
        answer:
          "A Receita Federal passou a emitir CNPJs alfanuméricos para novas inscrições a partir de julho de 2026, conforme a Instrução Normativa RFB nº 2.229/2024.",
      },
      {
        question: "Meu CNPJ atual vai mudar?",
        answer: "Não. CNPJs já existentes continuam com o mesmo número. Apenas novas inscrições recebem o formato alfanumérico.",
      },
      {
        question: "Quais caracteres o CNPJ alfanumérico pode ter?",
        answer:
          "As 12 primeiras posições aceitam números de 0 a 9 e letras maiúsculas de A a Z. As duas últimas posições, os dígitos verificadores, continuam sempre numéricas.",
      },
      {
        question: "Como calcular o dígito verificador do CNPJ alfanumérico?",
        answer:
          "Converta cada caractere em número pelo código ASCII menos 48 (A = 17, B = 18 e assim por diante) e aplique o mesmo módulo 11 do CNPJ numérico, com os pesos de 2 a 9.",
      },
      {
        question: "O que meu sistema precisa mudar para aceitar o novo CNPJ?",
        answer:
          "Campos e colunas que guardam o CNPJ como número precisam passar a aceitar texto, as máscaras e validações devem permitir letras nas 12 primeiras posições e o cálculo do dígito verificador deve usar a conversão por ASCII.",
      },
    ],
  },
  "gerar-cpf": {
    title: "Gerador de CPF Válido Online por Estado",
    description:
      "Gere CPFs válidos para testes de software, com ou sem pontuação, filtrando pelo estado de emissão. Gere vários CPFs de uma vez e copie com um clique.",
    faq: [
      {
        question: "O CPF gerado é de uma pessoa real?",
        answer:
          "Não. Os números são criados aleatoriamente e passam no cálculo dos dígitos verificadores, mas não estão ligados a nenhuma pessoa. Servem apenas para testes de sistemas e formulários.",
      },
      {
        question: "Posso usar um CPF gerado para fazer cadastros?",
        answer:
          "Não. Usar um CPF de outra pessoa ou inventado para se passar por alguém é crime. O gerador existe para desenvolvedores e testadores validarem seus sistemas.",
      },
      {
        question: "Como gerar CPF de um estado específico?",
        answer:
          "Escolha o estado no campo Estado antes de gerar. O nono dígito do CPF indica a região fiscal de emissão, e o gerador usa o dígito correspondente ao estado escolhido.",
      },
      {
        question: "Como funcionam os dígitos verificadores do CPF?",
        answer:
          "Os dois últimos dígitos são calculados a partir dos nove primeiros com somas ponderadas e o resto da divisão por 11. Isso permite detectar erros de digitação.",
      },
    ],
  },
  "validar-cpf": {
    title: "Validar CPF Online: Validador de CPF Grátis",
    description:
      "Verifique se um número de CPF é válido pelo cálculo dos dígitos verificadores. Digite com ou sem pontuação e veja o resultado na hora.",
    faq: [
      {
        question: "Como saber se um CPF é válido?",
        answer:
          "Um CPF é válido quando os dois dígitos verificadores batem com o cálculo feito sobre os nove primeiros dígitos. O validador faz essa conta automaticamente.",
      },
      {
        question: "O validador consulta a situação do CPF na Receita Federal?",
        answer:
          "Não. A ferramenta confere apenas se o número é matematicamente válido. Para saber se o CPF está regular, consulte o site da Receita Federal.",
      },
      {
        question: "Preciso digitar o CPF com pontos e traço?",
        answer: "Não. O CPF pode ser digitado com ou sem pontuação.",
      },
      {
        question: "Por que 111.111.111-11 é inválido?",
        answer:
          "CPFs com todos os dígitos iguais passam no cálculo dos verificadores, mas não são emitidos pela Receita Federal e por isso são considerados inválidos.",
      },
    ],
  },
  "gerar-cnpj": {
    title: "Gerador de CNPJ Válido: Numérico e Alfanumérico",
    description:
      "Gere CNPJs válidos para testes de software, no formato numérico ou no novo CNPJ alfanumérico, com ou sem pontuação. Gere vários de uma vez e copie com um clique.",
    faq: [
      {
        question: "O CNPJ gerado pertence a uma empresa real?",
        answer:
          "Não. Os números são aleatórios e só passam no cálculo dos dígitos verificadores. Eles servem para testar sistemas, não para identificar empresas.",
      },
      {
        question: "Como é formado o número do CNPJ?",
        answer:
          "O CNPJ tem 14 dígitos: os 8 primeiros identificam a empresa, os 4 seguintes a matriz ou filial (0001 é a matriz) e os 2 últimos são dígitos verificadores.",
      },
      {
        question: "O gerador cria CNPJ alfanumérico?",
        answer:
          "Sim. Escolha o tipo Alfanumérico para gerar CNPJs com letras e números nas 12 primeiras posições, no formato adotado pela Receita Federal a partir de julho de 2026.",
      },
      {
        question: "Posso gerar vários CNPJs de uma vez?",
        answer: "Sim. Defina a quantidade e o separador e todos os números aparecem prontos para copiar.",
      },
    ],
  },
  "validar-cnpj": {
    title: "Validar CNPJ Online: Numérico e Alfanumérico",
    description:
      "Verifique se um CNPJ é válido pelo cálculo dos dígitos verificadores, inclusive o novo CNPJ alfanumérico. Digite com ou sem pontuação e veja o resultado na hora.",
    faq: [
      {
        question: "Como saber se um CNPJ é válido?",
        answer:
          "Um CNPJ é válido quando os dois últimos dígitos batem com o cálculo dos dígitos verificadores feito sobre os 12 primeiros. O validador faz essa conta na hora.",
      },
      {
        question: "O validador aceita CNPJ alfanumérico?",
        answer:
          "Sim. CNPJs com letras nas 12 primeiras posições, como 12.ABC.345/01DE-35, são validados pela mesma regra oficial, convertendo cada caractere pelo código ASCII menos 48.",
      },
      {
        question: "O validador mostra a razão social da empresa?",
        answer:
          "Não. A ferramenta verifica apenas se o número é válido. Para ver dados cadastrais, consulte o comprovante de inscrição no site da Receita Federal.",
      },
      {
        question: "Preciso digitar o CNPJ com pontuação?",
        answer: "Não. O CNPJ pode ser digitado com ou sem pontos, barra e traço.",
      },
    ],
  },
  "gerar-cnh": {
    title: "Gerador de CNH Válida Online para Testes",
    description:
      "Gere números de CNH (registro nacional) válidos para testes de sistemas. Gere vários números de uma vez e copie com um clique.",
    faq: [
      {
        question: "O número de CNH gerado é de um motorista real?",
        answer:
          "Não. O número é aleatório e apenas passa no cálculo dos dígitos verificadores. Ele serve para testes de software e não é um documento de habilitação.",
      },
      {
        question: "Quantos dígitos tem o número da CNH?",
        answer:
          "O número de registro da CNH tem 11 dígitos. Os 9 primeiros são o número base e os 2 últimos são dígitos verificadores.",
      },
    ],
  },
  "validar-cnh": {
    title: "Validar CNH Online: Validador de CNH Grátis",
    description:
      "Verifique se o número de registro de uma CNH é válido pelo cálculo dos dígitos verificadores. Rápido, grátis e direto no navegador.",
    faq: [
      {
        question: "Como saber se o número da CNH é válido?",
        answer:
          "O número de registro da CNH tem 11 dígitos e os dois últimos são verificadores. Se eles batem com o cálculo feito sobre os 9 primeiros, o número é válido.",
      },
      {
        question: "O validador consulta pontos ou situação da CNH?",
        answer:
          "Não. A ferramenta confere apenas o formato e os dígitos verificadores. Pontos e situação da habilitação são consultados no Detran ou na Carteira Digital de Trânsito.",
      },
    ],
  },
  "gerar-rg": {
    title: "Gerador de RG SP Válido Online (SSP)",
    description:
      "Gere números de RG de São Paulo (SSP SP) válidos para testes, com ou sem pontuação. Gere vários RGs de uma vez e copie com um clique.",
    faq: [
      {
        question: "O RG gerado é de uma pessoa real?",
        answer:
          "Não. O número é aleatório e passa no cálculo do dígito verificador do RG de São Paulo. Ele serve apenas para testes de sistemas.",
      },
      {
        question: "Como é formado o RG de São Paulo?",
        answer:
          "O RG SSP SP tem 8 dígitos seguidos de um dígito verificador, que pode ser um número ou a letra X, no formato 00.000.000-0. O verificador é calculado com pesos de 2 a 9 e o resto da divisão por 11.",
      },
    ],
  },
  "validar-rg": {
    title: "Validar RG SP Online: Validador de RG SSP",
    description:
      "Verifique se um RG de São Paulo (SSP SP) é válido pelo cálculo do dígito verificador, inclusive quando o dígito é X. Digite com ou sem pontuação.",
    faq: [
      {
        question: "Como saber se um RG de São Paulo é válido?",
        answer:
          "O último caractere do RG SSP SP é um dígito verificador calculado a partir dos 8 primeiros números. Se o cálculo bate, o RG é válido.",
      },
      {
        question: "Por que alguns RGs terminam com X?",
        answer: "Quando o cálculo do dígito verificador resulta em 10, ele é representado pela letra X.",
      },
      {
        question: "O validador funciona para RG de outros estados?",
        answer:
          "Não. Cada estado tem sua própria regra. Esta ferramenta valida RGs de São Paulo. Para o Rio de Janeiro, use o validador de RG IFP RJ.",
      },
    ],
  },
  "gerar-rj": {
    title: "Gerador de RG RJ Válido Online (IFP / Detran)",
    description:
      "Gere números de RG do Rio de Janeiro (IFP RJ) válidos para testes, com ou sem pontuação. Gere vários de uma vez e copie com um clique.",
    faq: [
      {
        question: "O RG RJ gerado é de uma pessoa real?",
        answer:
          "Não. O número é aleatório e passa no cálculo do dígito verificador do RG IFP RJ. Ele serve apenas para testes de sistemas.",
      },
      {
        question: "O que é o IFP?",
        answer:
          "É o Instituto Félix Pacheco, órgão responsável pela identificação civil no Rio de Janeiro. Hoje a emissão do RG no estado é feita pelo Detran-RJ.",
      },
    ],
  },
  "validar-rj": {
    title: "Validar RG RJ Online: Validador de RG IFP",
    description:
      "Verifique se um RG do Rio de Janeiro (IFP RJ) é válido pelo cálculo do dígito verificador. Rápido, grátis e direto no navegador.",
    faq: [
      {
        question: "Como saber se um RG do Rio de Janeiro é válido?",
        answer:
          "O último dígito do RG IFP RJ é um verificador calculado a partir dos demais. Se o cálculo bate, o número é válido.",
      },
      {
        question: "O validador funciona para RG de São Paulo?",
        answer: "Não. Cada estado tem sua própria regra. Para São Paulo, use o validador de RG SSP SP.",
      },
    ],
  },
  "editar-texto": {
    title: "Converter Maiúsculas e Minúsculas Online",
    description:
      "Converta texto para maiúsculas ou minúsculas, capitalize palavras, inverta letras e remova palavras duplicadas online, com contagem de caracteres em tempo real.",
    faq: [
      {
        question: "Como converter um texto para maiúsculas?",
        answer: "Cole o texto no editor e clique em Maiúsculas. Para o contrário, use Minúsculas.",
      },
      {
        question: "Como deixar a primeira letra de cada palavra maiúscula?",
        answer: "Use a opção Capitalizar, que transforma a primeira letra de cada palavra em maiúscula.",
      },
      {
        question: "Dá para desfazer uma alteração?",
        answer: "Sim. O botão Desfazer volta o texto para a versão anterior a cada alteração.",
      },
    ],
  },
  "editar-palavras": {
    title: "Ordem Alfabética Online e Remover Duplicadas",
    description:
      "Ordene palavras em ordem alfabética, embaralhe, inverta a ordem e remova duplicadas. Separe as palavras por espaço, quebra de linha, vírgula ou ponto e vírgula.",
    faq: [
      {
        question: "Como colocar uma lista de palavras em ordem alfabética?",
        answer:
          "Cole a lista, escolha o separador usado (por exemplo, quebra de linha) e aplique a ordenação. O resultado pode ser copiado em seguida.",
      },
      {
        question: "Como remover palavras repetidas de uma lista?",
        answer: "Escolha o separador da lista e use a opção de remover duplicadas. Cada palavra fica só uma vez.",
      },
    ],
  },
  "cortar-texto": {
    title: "Cortar Texto Online: Limite de Caracteres",
    description:
      "Corte um texto no número máximo de caracteres que você definir, com opção de adicionar reticências no final. Ideal para títulos, resumos e campos com limite.",
    faq: [
      {
        question: "Como limitar um texto a um número de caracteres?",
        answer: "Cole o texto, informe o máximo de caracteres e o resultado é cortado automaticamente nesse limite.",
      },
      {
        question: "As reticências contam no limite?",
        answer:
          "Com a opção de reticências ativada, o texto é encurtado para que o resultado final, já com os três pontos, respeite o limite definido.",
      },
    ],
  },
  "dividir-texto": {
    title: "Dividir Texto Online por Separador",
    description:
      "Divida um texto em partes usando vírgula, ponto e vírgula, espaço ou qualquer outro separador. Transforme listas em linhas em segundos.",
    faq: [
      {
        question: "Como transformar uma lista separada por vírgula em linhas?",
        answer: "Cole o texto e use a vírgula como separador. Cada item passa a ficar em uma linha.",
      },
      {
        question: "Posso usar qualquer caractere como separador?",
        answer: "Sim. Informe o caractere ou sequência que separa as partes do texto.",
      },
    ],
  },
  "remover-acentos": {
    title: "Remover Acentos Online: Tirar Acentuação de Texto",
    description:
      "Remova acentos e cedilha de qualquer texto online: á vira a, ç vira c. Útil para URLs, nomes de arquivos, planilhas e sistemas que não aceitam acentuação.",
    faq: [
      {
        question: "Como tirar os acentos de um texto?",
        answer: "Cole o texto na caixa e a versão sem acentos aparece pronta para copiar.",
      },
      {
        question: "O cedilha também é removido?",
        answer: "Sim. O ç é convertido em c, assim como letras com til, crase, acento agudo e circunflexo.",
      },
      {
        question: "Para que serve remover acentos?",
        answer:
          "Para criar URLs e nomes de arquivos, padronizar dados em planilhas e bancos de dados e enviar textos para sistemas que não aceitam caracteres especiais.",
      },
    ],
  },
  "numeros-por-extenso": {
    title: "Escrever Número por Extenso Online",
    description:
      "Escreva qualquer número inteiro por extenso em português, de zero até quatrilhões. Ideal para cheques, contratos, recibos e documentos.",
    faq: [
      {
        question: "Como escrever um número por extenso?",
        answer:
          "Digite o número e ele aparece escrito por extenso em português. Por exemplo, 123 fica cento e vinte e três.",
      },
      {
        question: "Até que número a ferramenta escreve por extenso?",
        answer: "Até a casa dos quatrilhões, ou seja, números com até 18 dígitos.",
      },
      {
        question: "Quando usar o “e” nos números por extenso?",
        answer:
          "O “e” sempre liga centenas, dezenas e unidades (cento e vinte e três). Entre o milhar e a centena, ele só aparece quando a centena é redonda ou menor que cem: mil e duzentos, mil e cinquenta, mas mil duzentos e cinquenta.",
      },
      {
        question: "Escreve-se “mil” ou “um mil”?",
        answer: "A forma recomendada é apenas “mil”. Por exemplo, 1.500 se escreve mil e quinhentos.",
      },
    ],
  },
  "gerar-lorem": {
    title: "Gerador de Lorem Ipsum Online",
    description:
      "Gere texto Lorem Ipsum por parágrafos, palavras ou caracteres para mockups, layouts e testes. Copie o texto de preenchimento com um clique.",
    faq: [
      {
        question: "O que significa Lorem Ipsum?",
        answer:
          "É um texto de preenchimento derivado de uma obra de Cícero, em latim, usado desde o século XVI pela indústria gráfica para simular conteúdo em layouts.",
      },
      {
        question: "Posso gerar uma quantidade exata de caracteres?",
        answer: "Sim. Além de parágrafos e palavras, é possível gerar uma quantidade específica de caracteres.",
      },
    ],
  },
  "calcular-resto": {
    title: "Calculadora de Resto da Divisão Online",
    description:
      "Calcule o quociente e o resto de uma divisão entre dois números inteiros. Veja como funciona a divisão com resto e a operação módulo.",
    faq: [
      {
        question: "Como calcular o resto de uma divisão?",
        answer:
          "Divida o dividendo pelo divisor, pegue a parte inteira do resultado, multiplique pelo divisor e subtraia do dividendo. Em 17 ÷ 5, o quociente é 3 e o resto é 17 − 15 = 2.",
      },
      {
        question: "O que é a operação módulo?",
        answer:
          "Módulo (mod ou %) é a operação que retorna o resto da divisão. Ela é muito usada em programação, por exemplo para saber se um número é par.",
      },
      {
        question: "O resto pode ser maior que o divisor?",
        answer: "Não. Em uma divisão inteira, o resto é sempre menor que o divisor.",
      },
    ],
  },
  "calcular-tres": {
    title: "Calculadora de Regra de Três Simples Online",
    description:
      "Resolva regra de três simples online: informe três valores e descubra o quarto. Veja a fórmula, como montar a proporção e exemplos.",
    faq: [
      {
        question: "Como fazer regra de três simples?",
        answer:
          "Monte a proporção B está para A assim como C está para X. Multiplique cruzado e isole o X: X = A × C ÷ B.",
      },
      {
        question: "Qual a diferença entre grandezas diretas e inversas?",
        answer:
          "Nas diretamente proporcionais, quando uma aumenta a outra também aumenta (mais produtos, maior preço). Nas inversamente proporcionais, quando uma aumenta a outra diminui (mais trabalhadores, menos tempo).",
      },
      {
        question: "Dá para calcular porcentagem com regra de três?",
        answer: "Sim, mas a calculadora de porcentagem do UtiliTools resolve esses casos de forma mais direta.",
      },
    ],
  },
  "converter-numeros": {
    title: "Conversor Binário, Decimal, Octal e Hexadecimal",
    description:
      "Converta números entre binário, octal, decimal e hexadecimal em tempo real. Digite em qualquer base e veja as outras atualizarem na hora.",
    faq: [
      {
        question: "Como converter binário para decimal?",
        answer:
          "Multiplique cada dígito por 2 elevado à sua posição, da direita para a esquerda começando em zero, e some tudo. 1011 = 8 + 0 + 2 + 1 = 11.",
      },
      {
        question: "Como converter decimal para binário?",
        answer:
          "Divida o número por 2 sucessivamente e anote os restos. Lidos de baixo para cima, os restos formam o número binário.",
      },
      {
        question: "Para que serve o hexadecimal?",
        answer:
          "O hexadecimal representa números binários de forma compacta: cada dígito equivale a 4 bits. É usado em cores CSS, endereços de memória e códigos de erro.",
      },
    ],
  },
  "converter-temperaturas": {
    title: "Converter Celsius para Fahrenheit e Kelvin Online",
    description:
      "Converta temperaturas entre Celsius, Fahrenheit e Kelvin em tempo real. Veja as fórmulas de conversão e exemplos práticos.",
    faq: [
      {
        question: "Como converter Celsius para Fahrenheit?",
        answer: "Multiplique a temperatura em Celsius por 1,8 e some 32. Por exemplo, 25 °C = 25 × 1,8 + 32 = 77 °F.",
      },
      {
        question: "Como converter Fahrenheit para Celsius?",
        answer: "Subtraia 32 e divida por 1,8. Por exemplo, 100 °F = (100 − 32) ÷ 1,8 ≈ 37,8 °C.",
      },
      {
        question: "Como converter Celsius para Kelvin?",
        answer: "Some 273,15 à temperatura em Celsius. Por exemplo, 0 °C = 273,15 K.",
      },
    ],
  },
  "contar-dias": {
    title: "Calculadora de Dias Entre Datas Online",
    description:
      "Conte quantos dias existem entre duas datas. Ideal para calcular prazos, intervalos, viagens e períodos de forma rápida e gratuita.",
    faq: [
      {
        question: "Como calcular quantos dias tem entre duas datas?",
        answer: "Selecione a data inicial e a data final e clique em Calcular. O total de dias aparece na hora.",
      },
      {
        question: "A contagem inclui o dia inicial?",
        answer:
          "Não. O resultado é a diferença entre as datas, sem contar o dia inicial. De 12/03 a 19/03, por exemplo, são 7 dias.",
      },
      {
        question: "Posso calcular a idade de alguém em dias?",
        answer: "Sim, mas a ferramenta Calcular Idade já mostra a idade em anos, meses, dias e o total de dias vividos.",
      },
    ],
  },
  "gerar-nomes": {
    title: "Gerador de Nomes Aleatórios Brasileiros",
    description:
      "Gere nomes completos aleatórios em português, masculinos ou femininos. Ideal para testes de sistemas, personagens, jogos e dados fictícios.",
    faq: [
      {
        question: "Os nomes gerados são de pessoas reais?",
        answer:
          "Não. O gerador combina nomes e sobrenomes comuns no Brasil de forma aleatória. Qualquer coincidência com uma pessoa real é acaso.",
      },
      {
        question: "Posso escolher entre nomes masculinos e femininos?",
        answer: "Sim. Escolha o gênero antes de gerar o nome.",
      },
    ],
  },
  "gerar-numeros": {
    title: "Gerador de Números Aleatórios Online (Sorteio)",
    description:
      "Sorteie números aleatórios entre um mínimo e um máximo, gerando um ou vários números de uma vez. Ideal para sorteios, rifas e jogos.",
    faq: [
      {
        question: "Como sortear um número aleatório?",
        answer: "Defina o valor mínimo e o máximo, escolha a quantidade e clique em Gerar.",
      },
      {
        question: "Quantos números posso gerar de uma vez?",
        answer: "Até 1.000 números por vez.",
      },
      {
        question: "Os números podem se repetir?",
        answer:
          "Sim. Cada número é sorteado de forma independente. Para sortear nomes sem repetição, use o Sorteador de Nomes.",
      },
    ],
  },
  "calculadora-de-porcentagem": {
    title: "Calculadora de Porcentagem: Desconto e Aumento",
    description:
      "Calculadora de porcentagem grátis: descubra quanto é X% de um valor, aplique aumento ou desconto e calcule a variação percentual entre dois números.",
    faq: [
      {
        question: "Como calcular porcentagem de um valor?",
        answer:
          "Multiplique o valor pela porcentagem e divida por 100. Por exemplo, 15% de 200 é 200 × 15 ÷ 100 = 30.",
      },
      {
        question: "Como calcular desconto em porcentagem?",
        answer:
          "Multiplique o preço por (1 − porcentagem ÷ 100). Um produto de R$ 80 com 25% de desconto custa 80 × 0,75 = R$ 60.",
      },
      {
        question: "Como calcular o aumento percentual entre dois valores?",
        answer:
          "Subtraia o valor inicial do final, divida pelo valor inicial e multiplique por 100. De 50 para 65, o aumento é (65 − 50) ÷ 50 × 100 = 30%.",
      },
      {
        question: "Como saber quantos por cento um número representa de outro?",
        answer: "Divida a parte pelo total e multiplique por 100. 30 de 120 representa 30 ÷ 120 × 100 = 25%.",
      },
    ],
  },
  "contador-de-caracteres": {
    title: "Contador de Caracteres e Palavras Online",
    description:
      "Conte caracteres com e sem espaços, palavras, linhas e parágrafos em tempo real. Veja o tempo de leitura e os limites do X, Instagram e meta description.",
    faq: [
      {
        question: "Espaços contam como caracteres?",
        answer:
          "Sim. Espaços, quebras de linha e pontuação contam como caracteres. Por isso o contador mostra também o total sem espaços.",
      },
      {
        question: "Quantos caracteres cabem em um post no X (Twitter)?",
        answer: "Contas gratuitas podem publicar até 280 caracteres por post.",
      },
      {
        question: "Qual o limite de caracteres da legenda do Instagram?",
        answer: "A legenda de um post no Instagram aceita até 2.200 caracteres.",
      },
      {
        question: "Qual o tamanho ideal de title e meta description para SEO?",
        answer:
          "O Google costuma exibir cerca de 60 caracteres no título e entre 150 e 160 caracteres na meta description. Textos maiores podem ser cortados nos resultados.",
      },
      {
        question: "Como é calculado o tempo de leitura?",
        answer: "O tempo de leitura considera 200 palavras por minuto e o tempo de fala considera 130 palavras por minuto.",
      },
    ],
  },
  "gerador-de-senha": {
    title: "Gerador de Senha Forte e Aleatória Online",
    description:
      "Gere senhas fortes e aleatórias com letras maiúsculas, minúsculas, números e símbolos. As senhas são criadas no seu navegador e nunca são enviadas.",
    faq: [
      {
        question: "O gerador de senha é seguro?",
        answer:
          "Sim. As senhas são geradas no seu navegador com a API de criptografia (crypto.getRandomValues) e não são enviadas nem armazenadas em nenhum servidor.",
      },
      {
        question: "Qual o tamanho ideal de uma senha forte?",
        answer:
          "Use pelo menos 12 caracteres misturando letras maiúsculas, minúsculas, números e símbolos. Para contas importantes, prefira 16 caracteres ou mais.",
      },
      {
        question: "O que são caracteres ambíguos?",
        answer:
          "São caracteres fáceis de confundir, como O e 0 ou l, I e 1. Removê-los ajuda quando a senha precisa ser digitada ou lida em voz alta.",
      },
      {
        question: "Posso usar a mesma senha em vários sites?",
        answer:
          "Não é recomendado. Se um site vazar sua senha, todas as outras contas ficam expostas. Gere uma senha diferente para cada serviço e use um gerenciador de senhas.",
      },
    ],
  },
  "calcular-idade": {
    title: "Calcular Idade Exata pela Data de Nascimento",
    description:
      "Calcule sua idade exata em anos, meses e dias a partir da data de nascimento. Veja também o total de dias vividos e quantos dias faltam para o aniversário.",
    faq: [
      {
        question: "Como calcular a idade pela data de nascimento?",
        answer:
          "Subtraia o ano de nascimento do ano atual e diminua 1 se o aniversário deste ano ainda não chegou. A calculadora faz isso automaticamente e mostra também meses e dias.",
      },
      {
        question: "Como fica a idade de quem nasceu em 29 de fevereiro?",
        answer:
          "Em anos que não são bissextos, a calculadora considera 28 de fevereiro como a data do aniversário.",
      },
      {
        question: "Posso calcular a idade em uma data específica?",
        answer:
          "Sim. Troque a data de referência para descobrir a idade que a pessoa tinha ou terá em qualquer dia, como a data de um concurso ou de uma viagem.",
      },
    ],
  },
  "sorteador-de-nomes": {
    title: "Sorteador de Nomes Online Grátis",
    description:
      "Sorteie nomes de uma lista de forma justa e aleatória. Ideal para sorteios no Instagram, amigo secreto, rifas e para definir ordem de apresentação.",
    faq: [
      {
        question: "Como fazer um sorteio de nomes online?",
        answer:
          "Cole a lista de participantes com um nome por linha, escolha quantos nomes sortear e clique em Sortear. O resultado aparece na hora e pode ser copiado.",
      },
      {
        question: "O sorteio é justo?",
        answer:
          "Sim. Cada nome tem a mesma chance de ser escolhido. O sorteio usa o gerador criptográfico do navegador (crypto.getRandomValues), que não segue padrões previsíveis.",
      },
      {
        question: "Dá para sortear vários nomes sem repetir?",
        answer: "Sim. Um mesmo participante nunca é sorteado duas vezes no mesmo sorteio.",
      },
      {
        question: "Posso usar para sorteio no Instagram?",
        answer:
          "Sim. Copie os nomes de usuário dos comentários, cole um por linha e ative a opção de remover nomes repetidos para que cada pessoa participe uma única vez.",
      },
    ],
  },
  "formatar-json": {
    title: "Formatar JSON Online – Validador e Minificador de JSON",
    description:
      "Formate, valide e minifique JSON online grátis. Indente com 2 ou 4 espaços, ordene chaves e veja a linha e a coluna do erro. Tudo roda no navegador.",
    faq: [
      {
        question: "Como formatar um JSON online?",
        answer:
          "Cole o JSON no campo de entrada e o resultado formatado aparece na hora. Escolha 2 espaços, 4 espaços ou tab de indentação e clique em Copiar.",
      },
      {
        question: "Como saber se meu JSON é válido?",
        answer:
          "A ferramenta valida o JSON enquanto você digita. Se houver erro, ela mostra a linha e a coluna do problema, como uma vírgula sobrando ou uma aspa simples.",
      },
      {
        question: "Qual a diferença entre formatar e minificar JSON?",
        answer:
          "Formatar adiciona quebras de linha e indentação para facilitar a leitura. Minificar remove todos os espaços desnecessários para deixar o JSON menor. Os dados são os mesmos.",
      },
      {
        question: "JSON aceita comentários?",
        answer:
          "Não. O padrão JSON não permite comentários com // ou /* */. Formatos derivados como JSONC e JSON5 aceitam, mas não são JSON puro.",
      },
      {
        question: "Meu JSON é enviado para algum servidor?",
        answer: "Não. A formatação e a validação acontecem só no seu navegador, então você pode usar com dados sensíveis.",
      },
    ],
  },
  "codificar-base64": {
    title: "Base64 Encode e Decode Online – Codificar e Decodificar Base64",
    description:
      "Codifique texto para Base64 e decodifique Base64 para texto online, com suporte a acentos (UTF-8) e Base64 URL-safe. Grátis e sem enviar dados.",
    faq: [
      {
        question: "Como decodificar Base64?",
        answer:
          "Escolha Decodificar, cole o texto em Base64 e o conteúdo original aparece na hora. A ferramenta aceita também Base64 URL-safe, com - e _.",
      },
      {
        question: "Base64 é criptografia?",
        answer:
          "Não. Base64 é só uma codificação: qualquer pessoa consegue decodificar sem chave. Ele não deve ser usado para proteger senhas ou dados sensíveis.",
      },
      {
        question: "Por que o texto em Base64 termina com =?",
        answer:
          "O sinal de igual é preenchimento. Base64 codifica grupos de 3 bytes, e quando o texto não fecha um grupo completo são adicionados um ou dois =.",
      },
      {
        question: "O que é Base64 URL-safe?",
        answer:
          "É uma variante que troca + por - e / por _, e remove o =. Assim o valor pode ser usado em URLs e nomes de arquivo sem precisar de escape. É a variante usada no JWT.",
      },
      {
        question: "Quanto o Base64 aumenta o tamanho?",
        answer: "Cerca de 33%. Cada 3 bytes de entrada viram 4 caracteres em Base64.",
      },
    ],
  },
  "gerador-de-uuid": {
    title: "Gerador de UUID Online – UUID v4 e v7 em Massa",
    description:
      "Gere UUID v4 aleatório e UUID v7 ordenado por tempo, até 500 de uma vez. Maiúsculas, com ou sem hífens. Gerado no navegador com crypto seguro.",
    faq: [
      {
        question: "UUID e GUID são a mesma coisa?",
        answer:
          "Sim. GUID (Globally Unique Identifier) é o nome usado pela Microsoft para o mesmo padrão de identificador de 128 bits.",
      },
      {
        question: "Um UUID pode se repetir?",
        answer:
          "Na prática, não. O UUID v4 tem 122 bits aleatórios, e seria preciso gerar bilhões de UUIDs por segundo durante décadas para ter uma chance real de repetição.",
      },
      {
        question: "Qual a diferença entre UUID v4 e v7?",
        answer:
          "O v4 é totalmente aleatório. O v7 começa com o horário em milissegundos, então os IDs ficam em ordem de criação, o que melhora o desempenho de índices em bancos de dados.",
      },
      {
        question: "Posso usar UUID como chave primária?",
        answer:
          "Sim. Prefira o UUID v7 em tabelas grandes, porque a ordem por tempo evita fragmentação do índice. No PostgreSQL, use o tipo uuid em vez de texto.",
      },
      {
        question: "Quantos caracteres tem um UUID?",
        answer: "36 caracteres com hífens, ou 32 dígitos hexadecimais sem hífens.",
      },
    ],
  },
  "gerador-de-hash": {
    title: "Gerador de Hash Online – MD5, SHA-1, SHA-256 e SHA-512",
    description:
      "Gere hash MD5, SHA-1, SHA-256, SHA-384 e SHA-512 de qualquer texto ao mesmo tempo. Grátis, rápido e calculado no seu navegador.",
    faq: [
      {
        question: "Dá para descriptografar um hash MD5 ou SHA-256?",
        answer:
          "Não. Hash é uma função de mão única, não uma criptografia. Sites que dizem reverter MD5 só procuram o hash em listas de textos já conhecidos.",
      },
      {
        question: "Qual hash é mais seguro?",
        answer:
          "Entre os disponíveis, SHA-256 e SHA-512. MD5 e SHA-1 têm colisões conhecidas e não devem ser usados para segurança, apenas para checksums simples.",
      },
      {
        question: "Posso usar SHA-256 para guardar senhas?",
        answer:
          "Não é o ideal. SHA-256 é rápido demais, o que facilita ataques de força bruta. Para senhas, use bcrypt, scrypt ou Argon2, que são lentos e usam salt.",
      },
      {
        question: "Por que o hash muda quando adiciono um espaço?",
        answer:
          "Porque qualquer alteração no texto, mesmo um espaço ou uma quebra de linha, gera um hash completamente diferente. Isso é o efeito avalanche.",
      },
      {
        question: "Quantos caracteres tem cada hash?",
        answer: "Em hexadecimal: MD5 tem 32, SHA-1 tem 40, SHA-256 tem 64, SHA-384 tem 96 e SHA-512 tem 128 caracteres.",
      },
    ],
  },
  "codificar-url": {
    title: "URL Encode e Decode Online – Codificar URL",
    description:
      "Codifique e decodifique URLs e parâmetros de query string online. Converta espaços, acentos e símbolos para %20, %C3%A7 e volte ao texto original.",
    faq: [
      {
        question: "O que significa %20 em uma URL?",
        answer: "É o espaço codificado. Em URLs, o espaço não é permitido e vira %20, que é o código hexadecimal do caractere.",
      },
      {
        question: "Qual a diferença entre encodeURI e encodeURIComponent?",
        answer:
          "encodeURIComponent codifica tudo, inclusive / ? & e =, e serve para valores de parâmetros. encodeURI preserva a estrutura da URL e serve para o endereço completo.",
      },
      {
        question: "Por que o + virou espaço ao decodificar?",
        answer:
          "Formulários HTML enviam espaços como +. Por isso a ferramenta interpreta + como espaço ao decodificar. Para um + literal, use %2B.",
      },
      {
        question: "Como codificar acentos em uma URL?",
        answer:
          "Cole o texto e escolha Codificar. Cada letra acentuada vira os bytes em UTF-8, como ç para %C3%A7 e ã para %C3%A3.",
      },
    ],
  },
  "decodificar-jwt": {
    title: "Decodificar JWT Online – JWT Decoder",
    description:
      "Decodifique tokens JWT online e veja header, payload e datas de emissão e expiração. O token é lido só no navegador e não é enviado a servidores.",
    faq: [
      {
        question: "É seguro colar meu JWT aqui?",
        answer:
          "Sim. A decodificação acontece no seu navegador e o token não sai do seu computador. Mesmo assim, evite compartilhar tokens de produção válidos.",
      },
      {
        question: "Decodificar um JWT verifica a assinatura?",
        answer:
          "Não. Decodificar só lê o header e o payload. Verificar a assinatura exige a chave secreta (HS256) ou a chave pública (RS256) de quem emitiu o token.",
      },
      {
        question: "Como saber se o JWT está expirado?",
        answer:
          "Veja o campo exp do payload. Ele é um timestamp Unix em segundos, e a ferramenta mostra a data convertida e avisa se o token já expirou.",
      },
      {
        question: "O JWT é criptografado?",
        answer:
          "Na maioria dos casos, não. O JWT comum (JWS) é só assinado, e qualquer pessoa consegue ler o conteúdo. Existe o JWE, que é criptografado, mas é bem menos usado.",
      },
      {
        question: "O que significam iat, exp e sub?",
        answer:
          "iat é a data de emissão, exp é a data de expiração e sub é o identificador do usuário ou do sujeito do token.",
      },
    ],
  },
  "converter-timestamp": {
    title: "Converter Timestamp Unix em Data – Epoch Converter",
    description:
      "Converta timestamp Unix em data e data em timestamp online. Aceita segundos e milissegundos, mostra UTC e seu fuso horário e o timestamp atual.",
    faq: [
      {
        question: "O que é timestamp Unix?",
        answer: "É o número de segundos desde 1º de janeiro de 1970, às 00:00:00 UTC. Também é chamado de epoch time.",
      },
      {
        question: "Como saber se o timestamp está em segundos ou milissegundos?",
        answer:
          "Pelo número de dígitos. Datas atuais têm 10 dígitos em segundos e 13 em milissegundos. A ferramenta detecta a unidade automaticamente.",
      },
      {
        question: "O timestamp Unix tem fuso horário?",
        answer:
          "Não. Ele é sempre contado em UTC. O fuso só entra quando o número é convertido em data e hora para exibição.",
      },
      {
        question: "Como converter timestamp em data no Excel?",
        answer: "Use a fórmula =A1/86400+DATA(1970;1;1) e formate a célula como data e hora. O resultado fica em UTC.",
      },
      {
        question: "O que acontece em 2038?",
        answer:
          "Sistemas que guardam o timestamp em 32 bits estouram em 19 de janeiro de 2038. Sistemas de 64 bits, que são a maioria hoje, não têm esse problema.",
      },
    ],
  },
  "testar-regex": {
    title: "Testar Regex Online – Testador de Expressões Regulares",
    description:
      "Teste expressões regulares online com destaque das ocorrências, grupos de captura e substituição em tempo real. Usa o motor de regex do JavaScript.",
    faq: [
      {
        question: "Qual sintaxe de regex a ferramenta usa?",
        answer:
          "A do JavaScript (ECMAScript). Ela é compatível com a maior parte das regex de Python, Java, PHP e C#, com pequenas diferenças em recursos avançados.",
      },
      {
        question: "Para que serve a flag g?",
        answer:
          "A flag g (global) faz a busca encontrar todas as ocorrências. Sem ela, só a primeira ocorrência é considerada na busca e na substituição.",
      },
      {
        question: "Como usar grupos na substituição?",
        answer:
          "Coloque partes da regex entre parênteses e use $1, $2 e assim por diante no campo de substituição. $& insere a ocorrência inteira.",
      },
      {
        question: "Preciso escapar a barra invertida?",
        answer:
          "Não neste campo. Digite a regex como ela seria escrita entre barras no JavaScript, por exemplo \\d+. Só é preciso dobrar a barra quando a regex fica dentro de uma string no código.",
      },
      {
        question: "Qual regex valida e-mail?",
        answer:
          "Uma regex simples e prática é ^[\\w.+-]+@[\\w-]+\\.[\\w.]+$. Validar e-mail com 100% de precisão por regex é inviável, então o ideal é confirmar com um e-mail de verificação.",
      },
    ],
  },
  "gerador-de-slug": {
    title: "Gerador de Slug Online – Converter Texto em URL Amigável",
    description:
      "Transforme títulos em slugs para URL: sem acentos, sem espaços e com hífens. Gere vários slugs de uma vez para posts, produtos e páginas.",
    faq: [
      {
        question: "O que é slug de URL?",
        answer:
          "É a parte final do endereço que identifica a página, como como-fazer-pao em site.com/blog/como-fazer-pao. Ela usa letras minúsculas, números e hífens.",
      },
      {
        question: "É melhor usar hífen ou underline no slug?",
        answer:
          "Hífen. O Google trata o hífen como separador de palavras, enquanto o underline pode juntar as palavras em uma só.",
      },
      {
        question: "Posso usar acentos na URL?",
        answer:
          "Funciona, mas não é recomendado. Os acentos viram códigos como %C3%A7 quando o link é copiado, o que deixa a URL longa e difícil de ler.",
      },
      {
        question: "Qual o tamanho ideal de um slug?",
        answer:
          "Entre 3 e 5 palavras costuma funcionar bem. Mantenha a palavra-chave principal e tire palavras que não acrescentam sentido.",
      },
    ],
  },
};

export function getToolSeo(id: string, locale: Locale) {
  return locale === "en" ? TOOL_SEO_EN[id] : TOOL_SEO[id];
}
