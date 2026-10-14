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
          "Monte a proporção A está para B assim como C está para X. Multiplique cruzado e isole o X: X = B × C ÷ A.",
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
};

export function getToolSeo(segment: string) {
  return TOOL_SEO[segment];
}
