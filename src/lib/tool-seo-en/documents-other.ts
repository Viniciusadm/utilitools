import type { ToolSeo } from "@/lib/tool-seo";

export const SEO: Readonly<Record<string, ToolSeo>> = {
  "gerar-cartao-de-credito": {
    title: "Credit Card Generator – Valid Test Card Numbers with CVV",
    description:
      "Generate valid test credit card numbers for Visa, Mastercard, Amex, Diners, Elo and Hipercard, with expiration date and CVV. Luhn-valid, free.",
    faq: [
      {
        question: "Can the generated cards be used to make purchases?",
        answer:
          "No. The numbers only pass the Luhn algorithm. They are not linked to any bank, have no balance and are declined on any real purchase.",
      },
      {
        question: "What is a generated credit card number used for?",
        answer:
          "To test payment forms, input masks, card brand detection and front-end validation during software development.",
      },
      {
        question: "Which card brands can I generate?",
        answer:
          "Visa, Mastercard, American Express, Diners Club, plus the Brazilian brands Elo and Hipercard.",
      },
      {
        question: "Can I use these numbers to test my payment gateway?",
        answer:
          "For end-to-end tests, use your gateway's official test card numbers (such as Stripe, Adyen or PayPal), which simulate approvals and declines in the sandbox environment.",
      },
    ],
  },
  "validar-cartao-de-credito": {
    title: "Credit Card Validator – Check Card Numbers & Identify the Brand",
    description:
      "Check whether a credit card number is valid with the Luhn algorithm and identify its brand. Free, runs in your browser, no data is sent anywhere.",
    faq: [
      {
        question: "How can I tell if a card number is valid?",
        answer:
          "The last digit of a card number is calculated with the Luhn algorithm. If the check passes and the number of digits matches the brand, the number is valid.",
      },
      {
        question: "Does a valid number mean the card has available credit?",
        answer:
          "No. Validation only confirms the number is mathematically correct. Credit limit, status and cardholder can only be verified by the issuing bank.",
      },
      {
        question: "How do I find the card brand from the number?",
        answer:
          "From the leading digits, known as the BIN or IIN. Visa starts with 4, Mastercard with 51 to 55 or 2221 to 2720, American Express with 34 or 37, and Elo and Hipercard have their own ranges.",
      },
      {
        question: "Is it safe to validate a card here?",
        answer: "The calculation runs in your browser and the number is never sent to any server.",
      },
    ],
  },
  "gerar-pis": {
    title: "PIS Generator – Generate Valid Brazilian PIS/PASEP Numbers",
    description:
      "Generate valid Brazilian PIS, PASEP and NIS numbers to test HR and payroll systems, with or without formatting. Generate many at once, free.",
    faq: [
      {
        question: "Does a generated PIS belong to a real worker?",
        answer:
          "No. The numbers are random and only pass the check digit calculation. They are meant for software testing only.",
      },
      {
        question: "What is the PIS number format?",
        answer: "It has 11 digits in the format 000.00000.00-0, and the last one is the check digit.",
      },
      {
        question: "Does the generator also work for NIS and PASEP?",
        answer: "Yes. PIS, PASEP, NIS and NIT share the same format and the same check digit calculation.",
      },
    ],
  },
  "validar-pis": {
    title: "PIS Validator – Check Brazilian PIS/PASEP/NIS Numbers Online",
    description:
      "Check whether a Brazilian PIS, PASEP, NIS or NIT number is valid by calculating its check digit. Type it with or without formatting.",
    faq: [
      {
        question: "How do I know if a PIS number is valid?",
        answer:
          "Multiply the first 10 digits by the weights 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 and take the remainder of the sum divided by 11. The check digit is 0 if the remainder is 0 or 1, and 11 minus the remainder otherwise.",
      },
      {
        question: "Does the validator look up the PIS with Caixa?",
        answer:
          "No. The tool only checks whether the number is mathematically valid. To check benefits, use the FGTS app, Caixa Tem or the Digital Work Card (Carteira de Trabalho Digital).",
      },
      {
        question: "Are PIS and NIS the same number?",
        answer:
          "For people registered in PIS, the NIS is usually the same number. Both share the same format and can be validated here.",
      },
    ],
  },
  "gerar-titulo-de-eleitor": {
    title: "Voter ID Generator – Valid Brazilian Título de Eleitor by State",
    description:
      "Generate valid Brazilian voter ID numbers (título de eleitor) for testing, choosing the issuing state, with or without formatting. Free.",
    faq: [
      {
        question: "Does a generated voter ID belong to a real voter?",
        answer:
          "No. The number is random and only passes the check digit calculation. It is meant for software testing.",
      },
      {
        question: "Can I generate a voter ID for a specific state?",
        answer:
          "Yes. Choose the state before generating. The 9th and 10th digits of the voter ID identify the issuing Brazilian state.",
      },
      {
        question: "How many digits does a Brazilian voter ID have?",
        answer: "12 digits: 8 sequential digits, 2 for the state code and 2 check digits.",
      },
    ],
  },
  "validar-titulo-de-eleitor": {
    title: "Voter ID Validator – Check a Brazilian Título de Eleitor & State",
    description:
      "Check whether a Brazilian voter ID number (título de eleitor) is valid by calculating its check digits, and see which state issued it.",
    faq: [
      {
        question: "How do I know if a voter ID is valid?",
        answer:
          "The last two digits are check digits, calculated from the first 8 digits and the state code. If both match, the number is valid.",
      },
      {
        question: "How do I find out which state issued the voter ID?",
        answer:
          "From the 9th and 10th digits: 01 is São Paulo, 02 Minas Gerais, 03 Rio de Janeiro and so on, up to 28 for voters registered abroad. The validator shows the state automatically.",
      },
      {
        question: "Does the validator show whether the voter registration is in good standing?",
        answer:
          "No. It only checks the number. Voter status can be checked on the TSE (Superior Electoral Court) website or in the e-Título app.",
      },
    ],
  },
  "gerar-renavam": {
    title: "RENAVAM Generator – Valid Brazilian Vehicle Registration Numbers",
    description:
      "Generate valid 11-digit Brazilian RENAVAM numbers to test vehicle, car rental and insurance systems. Generate many at once, free.",
    faq: [
      {
        question: "Does a generated RENAVAM belong to a real vehicle?",
        answer:
          "No. The number is random and only passes the check digit calculation. It is meant for software testing.",
      },
      {
        question: "How many digits does a RENAVAM have?",
        answer:
          "Since 2013, RENAVAM has 11 digits. Older 9-digit numbers are padded with two leading zeros.",
      },
    ],
  },
  "validar-renavam": {
    title: "RENAVAM Validator – Check Brazilian Vehicle Registration Numbers",
    description:
      "Check whether a Brazilian RENAVAM vehicle registration number is valid by calculating its check digit. Accepts the 11-digit and older 9-digit formats.",
    faq: [
      {
        question: "How do I know if a RENAVAM is valid?",
        answer:
          "Multiply the first 10 digits by the weights 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, multiply the sum by 10 and take the remainder of the division by 11. If the result, with 10 becoming 0, matches the last digit, the RENAVAM is valid.",
      },
      {
        question: "Does the validator look up vehicle fees or fines?",
        answer:
          "No. It only checks whether the number is correct. Outstanding fees, IPVA tax and licensing are checked on the website of the state traffic department (Detran).",
      },
      {
        question: "My RENAVAM has 9 digits. Is it valid?",
        answer: "It can be. Older RENAVAM numbers have 9 digits and are validated by padding them with two leading zeros.",
      },
    ],
  },
  "gerar-rg": {
    title: "RG Generator – Valid São Paulo RG Numbers (SSP SP)",
    description:
      "Generate valid Brazilian RG ID numbers from São Paulo (SSP SP) for testing, with or without formatting. Generate many at once and copy in one click.",
    faq: [
      {
        question: "Does a generated RG belong to a real person?",
        answer:
          "No. The number is random and passes the São Paulo RG check digit calculation. It is meant for system testing only.",
      },
      {
        question: "How is a São Paulo RG number built?",
        answer:
          "The SSP SP RG has 8 digits followed by a check digit, which can be a number or the letter X, in the format 00.000.000-0. The check digit uses weights from 2 to 9 and the remainder of the division by 11.",
      },
    ],
  },
  "validar-rg": {
    title: "RG Validator – Check São Paulo RG Numbers (SSP SP) Online",
    description:
      "Check whether a São Paulo (SSP SP) Brazilian RG ID number is valid by calculating its check digit, including when it is X. With or without formatting.",
    faq: [
      {
        question: "How do I know if a São Paulo RG is valid?",
        answer:
          "The last character of an SSP SP RG is a check digit calculated from the first 8 digits. If the calculation matches, the RG is valid.",
      },
      {
        question: "Why do some RG numbers end with X?",
        answer: "When the check digit calculation results in 10, it is written as the letter X.",
      },
      {
        question: "Does the validator work for RGs from other states?",
        answer:
          "No. Each Brazilian state has its own rule. This tool validates São Paulo RGs. For Rio de Janeiro, use the IFP RJ RG validator.",
      },
    ],
  },
  "gerar-rj": {
    title: "RG RJ Generator – Valid Rio de Janeiro RG Numbers (IFP / Detran)",
    description:
      "Generate valid Brazilian RG ID numbers from Rio de Janeiro (IFP RJ) for testing, with or without formatting. Generate many at once and copy in one click.",
    faq: [
      {
        question: "Does a generated RJ RG belong to a real person?",
        answer:
          "No. The number is random and passes the IFP RJ RG check digit calculation. It is meant for system testing only.",
      },
      {
        question: "What is the IFP?",
        answer:
          "The Instituto Félix Pacheco is the agency responsible for civil identification in Rio de Janeiro. Today RGs in the state are issued by Detran-RJ.",
      },
    ],
  },
  "validar-rj": {
    title: "RG RJ Validator – Check Rio de Janeiro RG Numbers (IFP) Online",
    description:
      "Check whether a Rio de Janeiro (IFP RJ) Brazilian RG ID number is valid by calculating its check digit. Fast, free and right in your browser.",
    faq: [
      {
        question: "How do I know if a Rio de Janeiro RG is valid?",
        answer:
          "The last digit of an IFP RJ RG is a check digit calculated from the other digits. If the calculation matches, the number is valid.",
      },
      {
        question: "Does the validator work for São Paulo RGs?",
        answer: "No. Each Brazilian state has its own rule. For São Paulo, use the SSP SP RG validator.",
      },
    ],
  },
};
