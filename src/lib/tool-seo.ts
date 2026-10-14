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
  "calculadora-de-porcentagem": {
    title: "Calculadora de Porcentagem Online: Aumento, Desconto e %",
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
