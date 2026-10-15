import type { ToolSeo } from "@/lib/tool-seo";

export const SEO: Readonly<Record<string, ToolSeo>> = {
  "contador-de-caracteres": {
    title: "Character Counter – Count Characters and Words Online",
    description:
      "Count characters with and without spaces, words, lines and paragraphs in real time. See reading time and X, Instagram and meta description limits.",
    faq: [
      {
        question: "Do spaces count as characters?",
        answer:
          "Yes. Spaces, line breaks and punctuation all count as characters. That is why the counter also shows the total without spaces.",
      },
      {
        question: "How many characters fit in a post on X (Twitter)?",
        answer: "Free accounts can publish up to 280 characters per post.",
      },
      {
        question: "What is the Instagram caption character limit?",
        answer: "An Instagram post caption can have up to 2,200 characters.",
      },
      {
        question: "What is the ideal length for a title tag and meta description?",
        answer:
          "Google usually shows about 60 characters of the title and between 150 and 160 characters of the meta description. Longer text may be cut off in search results.",
      },
      {
        question: "How is reading time calculated?",
        answer: "Reading time assumes 200 words per minute and speaking time assumes 130 words per minute.",
      },
    ],
  },
  "editar-texto": {
    title: "Uppercase and Lowercase Converter – Online Text Editor",
    description:
      "Convert text to uppercase or lowercase, capitalize words, reverse letters and remove duplicate words online, with a live character count.",
    faq: [
      {
        question: "How do I convert text to uppercase?",
        answer: "Paste the text into the editor and click Uppercase. To do the opposite, use Lowercase.",
      },
      {
        question: "How do I capitalize the first letter of each word?",
        answer: "Use the Capitalize option, which turns the first letter of every word into a capital letter.",
      },
      {
        question: "Can I undo a change?",
        answer: "Yes. The Undo button restores the previous version of the text after each change.",
      },
    ],
  },
  "editar-palavras": {
    title: "Sort Words Alphabetically and Remove Duplicates Online",
    description:
      "Sort words in alphabetical order, shuffle them, reverse the order and remove duplicates. Split words by space, line break, comma or semicolon.",
    faq: [
      {
        question: "How do I put a list of words in alphabetical order?",
        answer:
          "Paste the list, choose the separator it uses (for example, line break) and apply the sort. You can then copy the result.",
      },
      {
        question: "How do I remove duplicate words from a list?",
        answer: "Choose the list separator and use the remove duplicates option. Each word will appear only once.",
      },
    ],
  },
  "cortar-texto": {
    title: "Truncate Text Online – Limit Text to a Number of Characters",
    description:
      "Cut text down to the maximum number of characters you choose, with an option to add an ellipsis at the end. Ideal for titles, excerpts and limited fields.",
    faq: [
      {
        question: "How do I limit a text to a number of characters?",
        answer: "Paste the text, enter the maximum number of characters and the result is cut off at that limit.",
      },
      {
        question: "Does the ellipsis count toward the limit?",
        answer:
          "With the ellipsis option on, the text is shortened so that the final result, including the three dots, stays within the limit you set.",
      },
    ],
  },
  "dividir-texto": {
    title: "Split Text Online by Delimiter",
    description:
      "Split text into parts using a comma, semicolon, space or any other delimiter. Turn comma-separated lists into lines in seconds.",
    faq: [
      {
        question: "How do I turn a comma-separated list into lines?",
        answer: "Paste the text and use a comma as the separator. Each item ends up on its own line.",
      },
      {
        question: "Can I use any character as a separator?",
        answer: "Yes. Enter the character or sequence of characters that separates the parts of the text.",
      },
    ],
  },
  "remover-acentos": {
    title: "Remove Accents Online – Strip Diacritics from Text",
    description:
      "Remove accents and diacritics from any text online: é becomes e, ç becomes c, ñ becomes n. Useful for URLs, file names, spreadsheets and databases.",
    faq: [
      {
        question: "How do I remove accents from a text?",
        answer: "Paste the text into the box, click Remove and the unaccented version is ready to copy.",
      },
      {
        question: "Are the cedilla and tilde removed too?",
        answer:
          "Yes. ç becomes c and ñ becomes n, just like letters with acute, grave and circumflex accents or umlauts (á, è, ê, ü).",
      },
      {
        question: "Why remove accents?",
        answer:
          "To create URLs, slugs and file names, normalize data in spreadsheets and databases, and send text to systems that do not accept special characters.",
      },
    ],
  },
  "numeros-por-extenso": {
    title: "Number to Words Converter – Spell Out Numbers in English",
    description:
      "Convert any whole number to words in English, from zero up to quadrillions. Ideal for writing checks, invoices, contracts and documents.",
    faq: [
      {
        question: "How do I write a number in words?",
        answer:
          "Type the number and it appears spelled out in English. For example, 123 becomes one hundred twenty-three.",
      },
      {
        question: "What is the largest number the tool can convert?",
        answer: "Up to the quadrillions, that is, numbers with up to 18 digits.",
      },
      {
        question: "Should I use “and” when writing numbers in words?",
        answer:
          "In American English, “and” is usually left out: one hundred twenty-three. In British English it is common to add it after hundred: one hundred and twenty-three. Both are correct.",
      },
      {
        question: "Do you write “thousand” or “one thousand”?",
        answer:
          "In English the number before the scale word is always written: 1,500 is one thousand five hundred, and the scale word never takes an “s”: two thousand, not two thousands.",
      },
    ],
  },
  "gerar-lorem": {
    title: "Lorem Ipsum Generator – Placeholder Text Online",
    description:
      "Generate Lorem Ipsum by paragraphs, words or characters for mockups, layouts and tests. Copy the placeholder text with one click.",
    faq: [
      {
        question: "What does Lorem Ipsum mean?",
        answer:
          "It is placeholder text derived from a Latin work by Cicero, used by the printing industry since the 16th century to simulate content in layouts.",
      },
      {
        question: "Can I generate an exact number of characters?",
        answer: "Yes. Besides paragraphs and words, you can generate a specific number of characters.",
      },
    ],
  },
};
