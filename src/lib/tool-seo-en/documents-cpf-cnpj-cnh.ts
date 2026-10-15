import type { ToolSeo } from "@/lib/tool-seo";

export const SEO: Readonly<Record<string, ToolSeo>> = {
  "cnpj-alfanumerico": {
    title: "Alphanumeric CNPJ: Validate, Generate and Calculate Check Digits",
    description:
      "Validate and generate Brazil's new alphanumeric CNPJ online. Learn the new format with letters (IN RFB 2,229/2024) and how to calculate the check digits.",
    faq: [
      {
        question: "When did the alphanumeric CNPJ take effect?",
        answer:
          "Brazil's Receita Federal started issuing alphanumeric CNPJs for new registrations in July 2026, under Normative Instruction RFB No. 2,229/2024.",
      },
      {
        question: "Will existing CNPJ numbers change?",
        answer: "No. Existing CNPJs keep the same number. Only new registrations receive the alphanumeric format.",
      },
      {
        question: "Which characters can an alphanumeric CNPJ contain?",
        answer:
          "The first 12 positions accept digits 0 to 9 and uppercase letters A to Z. The last two positions, the check digits, are always numeric.",
      },
      {
        question: "How do I calculate the check digit of an alphanumeric CNPJ?",
        answer:
          "Convert each character to a number using its ASCII code minus 48 (A = 17, B = 18 and so on) and apply the same modulo 11 used for the numeric CNPJ, with weights from 2 to 9.",
      },
      {
        question: "What does my system need to change to support the new CNPJ?",
        answer:
          "Fields and database columns that store the CNPJ as a number must accept text, masks and validations must allow letters in the first 12 positions, and the check digit calculation must use the ASCII conversion.",
      },
    ],
  },
  "gerar-cpf": {
    title: "CPF Generator – Generate Valid Brazilian CPF Numbers by State",
    description:
      "Generate valid Brazilian CPF numbers for software testing, with or without formatting and filtered by issuing state. Generate in bulk and copy in one click.",
    faq: [
      {
        question: "Does a generated CPF belong to a real person?",
        answer:
          "No. The numbers are created at random and pass the check digit calculation, but they are not linked to anyone. They are meant only for testing systems and forms.",
      },
      {
        question: "Can I use a generated CPF to sign up for services?",
        answer:
          "No. Using someone else's or a made-up CPF to impersonate a person is a crime in Brazil. The generator exists so developers and QA testers can test their systems.",
      },
      {
        question: "How do I generate a CPF from a specific Brazilian state?",
        answer:
          "Pick the state in the State field before generating. The ninth digit of a CPF indicates the tax region where it was issued, and the generator uses the digit that matches the chosen state.",
      },
      {
        question: "How do CPF check digits work?",
        answer:
          "The last two digits are calculated from the first nine using weighted sums and the remainder of a division by 11. This lets systems detect typos.",
      },
    ],
  },
  "validar-cpf": {
    title: "CPF Validator – Check if a Brazilian CPF Number Is Valid",
    description:
      "Check whether a Brazilian CPF number is valid by calculating its check digits. Type it with or without dots and dash and see the result instantly.",
    faq: [
      {
        question: "How do I know if a CPF is valid?",
        answer:
          "A CPF is valid when its two check digits match the calculation made on the first nine digits. The validator does that math automatically.",
      },
      {
        question: "Does the validator check the CPF status with the Receita Federal?",
        answer:
          "No. The tool only checks whether the number is mathematically valid. To see whether a CPF is in good standing, use the Receita Federal website.",
      },
      {
        question: "Do I need to type the CPF with dots and dash?",
        answer: "No. You can type the CPF with or without formatting (000.000.000-00 or 00000000000).",
      },
      {
        question: "Why is 111.111.111-11 invalid?",
        answer:
          "CPFs with all identical digits pass the check digit calculation, but the Receita Federal never issues them, so they are considered invalid.",
      },
    ],
  },
  "gerar-cnpj": {
    title: "CNPJ Generator – Valid Brazilian CNPJ, Numeric and Alphanumeric",
    description:
      "Generate valid Brazilian CNPJ numbers for software testing, numeric or the new alphanumeric CNPJ, with or without formatting. Generate many at once and copy.",
    faq: [
      {
        question: "Does a generated CNPJ belong to a real company?",
        answer:
          "No. The numbers are random and only pass the check digit calculation. They are meant for testing systems, not for identifying companies.",
      },
      {
        question: "How is a CNPJ number formed?",
        answer:
          "A CNPJ has 14 digits: the first 8 identify the company, the next 4 identify the head office or branch (0001 is the head office) and the last 2 are check digits.",
      },
      {
        question: "Can the generator create alphanumeric CNPJs?",
        answer:
          "Yes. Choose the Alphanumeric type to generate CNPJs with letters and numbers in the first 12 positions, the format adopted by Brazil's Receita Federal in July 2026.",
      },
      {
        question: "Can I generate several CNPJs at once?",
        answer: "Yes. Set the quantity and the separator and all the numbers appear ready to copy.",
      },
    ],
  },
  "validar-cnpj": {
    title: "CNPJ Validator – Check Brazilian CNPJ, Numeric and Alphanumeric",
    description:
      "Check whether a Brazilian CNPJ is valid by calculating its check digits, including the new alphanumeric CNPJ. Type it with or without formatting.",
    faq: [
      {
        question: "How do I know if a CNPJ is valid?",
        answer:
          "A CNPJ is valid when its last two digits match the check digit calculation made on the first 12 characters. The validator does that math instantly.",
      },
      {
        question: "Does the validator accept alphanumeric CNPJs?",
        answer:
          "Yes. CNPJs with letters in the first 12 positions, such as 12.ABC.345/01DE-35, are validated with the same official rule, converting each character to its ASCII code minus 48.",
      },
      {
        question: "Does the validator show the company name?",
        answer:
          "No. The tool only checks whether the number is valid. To see registration data, look up the CNPJ registration certificate on the Receita Federal website.",
      },
      {
        question: "Do I need to type the CNPJ with formatting?",
        answer: "No. You can type the CNPJ with or without dots, slash and dash.",
      },
    ],
  },
  "gerar-cnh": {
    title: "CNH Generator – Valid Brazilian Driver's License Numbers for Testing",
    description:
      "Generate valid Brazilian driver's license (CNH) registration numbers for software testing. Generate many numbers at once and copy them in one click.",
    faq: [
      {
        question: "Does a generated CNH number belong to a real driver?",
        answer:
          "No. The number is random and only passes the check digit calculation. It is meant for software testing and is not a driver's license.",
      },
      {
        question: "How many digits does a CNH number have?",
        answer:
          "The CNH registration number has 11 digits. The first 9 are the base number and the last 2 are check digits.",
      },
    ],
  },
  "validar-cnh": {
    title: "CNH Validator – Check a Brazilian Driver's License Number",
    description:
      "Check whether a Brazilian driver's license (CNH) registration number is valid by calculating its check digits. Fast, free and right in your browser.",
    faq: [
      {
        question: "How do I know if a CNH number is valid?",
        answer:
          "The CNH registration number has 11 digits and the last two are check digits. If they match the calculation made on the first 9 digits, the number is valid.",
      },
      {
        question: "Does the validator check license points or status?",
        answer:
          "No. The tool only checks the format and the check digits. License points and status are available from the state Detran or the Carteira Digital de Trânsito app.",
      },
    ],
  },
};
