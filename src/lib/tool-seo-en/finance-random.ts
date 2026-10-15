import type { ToolSeo } from "@/lib/tool-seo";

export const SEO: Readonly<Record<string, ToolSeo>> = {
  "gerador-de-qr-code-pix": {
    title: "Pix QR Code Generator – Free Pix Copy and Paste Code",
    description:
      "Create a free Pix QR code and Pix copy-and-paste code for Brazil's instant payments, with or without an amount. Download as PNG. Nothing is sent to servers.",
    faq: [
      {
        question: "Is it safe to generate a Pix QR code here?",
        answer:
          "Yes. The QR code is generated in your browser and no data is sent or stored. The money goes straight to the account linked to the Pix key you entered, with no middleman.",
      },
      {
        question: "Does a Pix QR code expire?",
        answer:
          "No. The generated QR code is static: it can be used as many times as you like and does not expire as long as the Pix key remains registered.",
      },
      {
        question: "Can I create a Pix QR code with a fixed amount?",
        answer:
          "Yes. Fill in the Amount field and the payer only needs to confirm. Leave it blank to let them type the amount in their banking app. Amounts are always in Brazilian reais (BRL).",
      },
      {
        question: "What is Pix copy and paste (Pix copia e cola)?",
        answer:
          "It is the same content as the QR code in text form. The payer pastes the code into the Pix area of their banking app to pay, which is useful when scanning is not possible.",
      },
      {
        question: "Why is the name shown without accents?",
        answer:
          "The Pix standard (BR Code) only accepts unaccented characters and limits the name to 25 characters and the city to 15. The adjustment is made automatically.",
      },
    ],
  },
  "calculadora-de-juros-compostos": {
    title: "Compound Interest Calculator with Monthly Contributions",
    description:
      "Calculate compound interest with an initial deposit, monthly contributions and a monthly or annual rate. See the future value, interest earned and yearly growth.",
    faq: [
      {
        question: "What is the compound interest formula?",
        answer:
          "A = P × (1 + r)ⁿ, where A is the final amount, P the principal, r the rate per period and n the number of periods. With contributions, each deposit earns interest for as long as it stays invested.",
      },
      {
        question: "What is the difference between simple and compound interest?",
        answer:
          "With simple interest, interest is only charged on the initial amount. With compound interest, it is applied to the accumulated balance, including previous interest, so your money grows faster over time.",
      },
      {
        question: "How do I convert an annual rate to a monthly rate?",
        answer:
          "Use (1 + annual rate)^(1/12) − 1. For example, 12% per year is about 0.95% per month. The calculator does this conversion when you choose an annual rate.",
      },
      {
        question: "Does the simulation include taxes?",
        answer:
          "No. The result is gross, without income tax, fees or inflation. The net amount depends on the type of investment and the time period.",
      },
    ],
  },
  "gerador-de-senha": {
    title: "Password Generator – Strong Random Passwords Online",
    description:
      "Generate strong, random passwords with uppercase and lowercase letters, numbers and symbols. Passwords are created in your browser and never sent anywhere.",
    faq: [
      {
        question: "Is this password generator safe?",
        answer:
          "Yes. Passwords are generated in your browser with the Web Crypto API (crypto.getRandomValues) and are never sent to or stored on any server.",
      },
      {
        question: "How long should a strong password be?",
        answer:
          "Use at least 12 characters mixing uppercase letters, lowercase letters, numbers and symbols. For important accounts, go for 16 characters or more.",
      },
      {
        question: "What are ambiguous characters?",
        answer:
          "They are characters that are easy to mix up, such as O and 0 or l, I and 1. Removing them helps when the password has to be typed or read aloud.",
      },
      {
        question: "Can I use the same password on several websites?",
        answer:
          "It is not recommended. If one website leaks your password, all your other accounts are exposed. Generate a different password for each service and use a password manager.",
      },
    ],
  },
  "sorteador-de-nomes": {
    title: "Random Name Picker – Free Online Name Draw",
    description:
      "Pick random names from a list fairly and instantly. Perfect for Instagram giveaways, Secret Santa, raffles and deciding the order of presentations.",
    faq: [
      {
        question: "How do I pick a random name online?",
        answer:
          "Paste the list of participants with one name per line, choose how many names to pick and click Pick. The result appears instantly and can be copied.",
      },
      {
        question: "Is the draw fair?",
        answer:
          "Yes. Every name has the same chance of being chosen. The draw uses the browser's cryptographic random generator (crypto.getRandomValues), which follows no predictable pattern.",
      },
      {
        question: "Can I pick several names without repeats?",
        answer: "Yes. The same participant is never picked twice in the same draw.",
      },
      {
        question: "Can I use it for an Instagram giveaway?",
        answer:
          "Yes. Copy the usernames from the comments, paste one per line and turn on the option to remove duplicate names so each person enters only once.",
      },
    ],
  },
  "gerar-nomes": {
    title: "Random Brazilian Name Generator – Fake Names for Testing",
    description:
      "Generate random Brazilian full names in Portuguese, male or female. Ideal for test data, QA, mock users, characters and games.",
    faq: [
      {
        question: "Are the generated names of real people?",
        answer:
          "No. The generator randomly combines common Brazilian first names and surnames. Any match with a real person is pure coincidence.",
      },
      {
        question: "Can I choose between male and female names?",
        answer: "Yes. Choose the gender before generating the name.",
      },
    ],
  },
  "gerar-numeros": {
    title: "Random Number Generator – Pick Numbers Online",
    description:
      "Generate random numbers between a minimum and a maximum, one or many at a time. Ideal for giveaways, raffles, lotteries and games.",
    faq: [
      {
        question: "How do I generate a random number?",
        answer: "Set the minimum and maximum values, choose the quantity and click Generate.",
      },
      {
        question: "How many numbers can I generate at once?",
        answer: "Up to 1,000 numbers at a time.",
      },
      {
        question: "Can the numbers repeat?",
        answer:
          "Yes. Each number is drawn independently. To pick names without repeats, use the Random Name Picker.",
      },
    ],
  },
};
