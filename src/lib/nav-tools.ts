import {
  Binary,
  Briefcase,
  Building2,
  Cake,
  CalendarCheck,
  CalendarDays,
  Car,
  CarFront,
  Columns2,
  CreditCard,
  Dices,
  Divide,
  Eraser,
  FileText,
  IdCard,
  KeyRound,
  LetterText,
  PencilLine,
  QrCode,
  Percent,
  Scale,
  Scissors,
  ShieldCheck,
  SpellCheck,
  Thermometer,
  TrendingUp,
  Trophy,
  Users,
  Vote,
  Weight,
  WholeWord,
  type LucideIcon,
} from "lucide-react";

import { homePath, localePrefix, type Locale, type Localized } from "@/lib/i18n";

export const NAV_CATEGORIES = ["documents", "finance", "text", "math", "random"] as const;

export type NavCategory = (typeof NAV_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<NavCategory, Localized<string>> = {
  documents: { pt: "Documentos", en: "Documents" },
  finance: { pt: "Finanças", en: "Finance" },
  text: { pt: "Texto", en: "Text" },
  math: { pt: "Matemática", en: "Math" },
  random: { pt: "Dados aleatórios", en: "Random data" },
};

export type NavTool = {
  id: string;
  slugs: Localized<string>;
  title: Localized<string>;
  desc: Localized<string>;
  category: NavCategory;
  icon: LucideIcon;
};

export const NAV_TOOLS: readonly NavTool[] = [
  {
    id: "gerar-cpf",
    slugs: { pt: "gerar-cpf", en: "cpf-generator" },
    title: { pt: "Gerar CPF", en: "CPF Generator" },
    desc: { pt: "Gere CPFs válidos", en: "Generate valid Brazilian CPF numbers" },
    category: "documents",
    icon: IdCard,
  },
  {
    id: "validar-cpf",
    slugs: { pt: "validar-cpf", en: "cpf-validator" },
    title: { pt: "Validar CPF", en: "CPF Validator" },
    desc: { pt: "Valide números de CPF", en: "Validate Brazilian CPF numbers" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "gerar-cnpj",
    slugs: { pt: "gerar-cnpj", en: "cnpj-generator" },
    title: { pt: "Gerar CNPJ", en: "CNPJ Generator" },
    desc: { pt: "Gere CNPJs válidos", en: "Generate valid Brazilian CNPJ numbers" },
    category: "documents",
    icon: Building2,
  },
  {
    id: "validar-cnpj",
    slugs: { pt: "validar-cnpj", en: "cnpj-validator" },
    title: { pt: "Validar CNPJ", en: "CNPJ Validator" },
    desc: { pt: "Valide números de CNPJ", en: "Validate Brazilian CNPJ numbers" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "cnpj-alfanumerico",
    slugs: { pt: "cnpj-alfanumerico", en: "alphanumeric-cnpj" },
    title: { pt: "CNPJ Alfanumérico", en: "Alphanumeric CNPJ" },
    desc: { pt: "Valide e gere o novo CNPJ com letras", en: "Validate and generate the new CNPJ with letters" },
    category: "documents",
    icon: Building2,
  },
  {
    id: "gerar-cnh",
    slugs: { pt: "gerar-cnh", en: "cnh-generator" },
    title: { pt: "Gerar CNH", en: "CNH Generator" },
    desc: { pt: "Gere números de CNH", en: "Generate Brazilian driver's license numbers" },
    category: "documents",
    icon: Car,
  },
  {
    id: "validar-cnh",
    slugs: { pt: "validar-cnh", en: "cnh-validator" },
    title: { pt: "Validar CNH", en: "CNH Validator" },
    desc: { pt: "Valide números de CNH", en: "Validate Brazilian driver's license numbers" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "gerar-rg",
    slugs: { pt: "gerar-rg", en: "rg-sp-generator" },
    title: { pt: "Gerar RG SP", en: "RG SP Generator" },
    desc: { pt: "Gere números de RG", en: "Generate São Paulo RG numbers" },
    category: "documents",
    icon: IdCard,
  },
  {
    id: "validar-rg",
    slugs: { pt: "validar-rg", en: "rg-sp-validator" },
    title: { pt: "Validar RG SP", en: "RG SP Validator" },
    desc: { pt: "Valide números de RG", en: "Validate São Paulo RG numbers" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "gerar-rj",
    slugs: { pt: "gerar-rj", en: "rg-rj-generator" },
    title: { pt: "Gerar RG RJ", en: "RG RJ Generator" },
    desc: { pt: "Gere números de RG do RJ", en: "Generate Rio de Janeiro RG numbers" },
    category: "documents",
    icon: IdCard,
  },
  {
    id: "validar-rj",
    slugs: { pt: "validar-rj", en: "rg-rj-validator" },
    title: { pt: "Validar RG RJ", en: "RG RJ Validator" },
    desc: { pt: "Valide números de RG do RJ", en: "Validate Rio de Janeiro RG numbers" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "gerador-de-qr-code-pix",
    slugs: { pt: "gerador-de-qr-code-pix", en: "pix-qr-code-generator" },
    title: { pt: "QR Code Pix", en: "Pix QR Code" },
    desc: { pt: "Gere QR Code e Pix copia e cola", en: "Generate Pix QR codes and copy-and-paste codes" },
    category: "finance",
    icon: QrCode,
  },
  {
    id: "calculadora-de-juros-compostos",
    slugs: { pt: "calculadora-de-juros-compostos", en: "compound-interest-calculator" },
    title: { pt: "Juros Compostos", en: "Compound Interest" },
    desc: { pt: "Simule rendimentos com aportes mensais", en: "Simulate returns with monthly contributions" },
    category: "finance",
    icon: TrendingUp,
  },
  {
    id: "contador-de-caracteres",
    slugs: { pt: "contador-de-caracteres", en: "character-counter" },
    title: { pt: "Contador de Caracteres", en: "Character Counter" },
    desc: { pt: "Conte caracteres, palavras e linhas", en: "Count characters, words and lines" },
    category: "text",
    icon: LetterText,
  },
  {
    id: "gerar-cartao-de-credito",
    slugs: { pt: "gerar-cartao-de-credito", en: "credit-card-generator" },
    title: { pt: "Gerar Cartão de Crédito", en: "Credit Card Generator" },
    desc: { pt: "Gere cartões de teste com bandeira, validade e CVV", en: "Generate test cards with brand, expiry date and CVV" },
    category: "documents",
    icon: CreditCard,
  },
  {
    id: "validar-cartao-de-credito",
    slugs: { pt: "validar-cartao-de-credito", en: "credit-card-validator" },
    title: { pt: "Validar Cartão de Crédito", en: "Credit Card Validator" },
    desc: { pt: "Valide o número e descubra a bandeira", en: "Validate the number and detect the card brand" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "gerar-pis",
    slugs: { pt: "gerar-pis", en: "pis-generator" },
    title: { pt: "Gerar PIS", en: "PIS Generator" },
    desc: { pt: "Gere números de PIS/PASEP/NIS", en: "Generate PIS/PASEP/NIS numbers" },
    category: "documents",
    icon: Briefcase,
  },
  {
    id: "validar-pis",
    slugs: { pt: "validar-pis", en: "pis-validator" },
    title: { pt: "Validar PIS", en: "PIS Validator" },
    desc: { pt: "Valide números de PIS/PASEP/NIS", en: "Validate PIS/PASEP/NIS numbers" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "gerar-titulo-de-eleitor",
    slugs: { pt: "gerar-titulo-de-eleitor", en: "voter-id-generator" },
    title: { pt: "Gerar Título de Eleitor", en: "Voter ID Generator" },
    desc: { pt: "Gere títulos de eleitor por estado", en: "Generate Brazilian voter IDs by state" },
    category: "documents",
    icon: Vote,
  },
  {
    id: "validar-titulo-de-eleitor",
    slugs: { pt: "validar-titulo-de-eleitor", en: "voter-id-validator" },
    title: { pt: "Validar Título de Eleitor", en: "Voter ID Validator" },
    desc: { pt: "Valide títulos e veja o estado", en: "Validate voter IDs and see the state" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "gerar-renavam",
    slugs: { pt: "gerar-renavam", en: "renavam-generator" },
    title: { pt: "Gerar RENAVAM", en: "RENAVAM Generator" },
    desc: { pt: "Gere números de RENAVAM", en: "Generate RENAVAM vehicle numbers" },
    category: "documents",
    icon: CarFront,
  },
  {
    id: "validar-renavam",
    slugs: { pt: "validar-renavam", en: "renavam-validator" },
    title: { pt: "Validar RENAVAM", en: "RENAVAM Validator" },
    desc: { pt: "Valide números de RENAVAM", en: "Validate RENAVAM vehicle numbers" },
    category: "documents",
    icon: ShieldCheck,
  },
  {
    id: "editar-texto",
    slugs: { pt: "editar-texto", en: "case-converter" },
    title: { pt: "Editar Texto", en: "Case Converter" },
    desc: { pt: "Edite e formate textos", en: "Edit and format text" },
    category: "text",
    icon: PencilLine,
  },
  {
    id: "editar-palavras",
    slugs: { pt: "editar-palavras", en: "word-editor" },
    title: { pt: "Editar Palavras", en: "Word Editor" },
    desc: { pt: "Transforme palavras", en: "Sort, shuffle and transform words" },
    category: "text",
    icon: WholeWord,
  },
  {
    id: "cortar-texto",
    slugs: { pt: "cortar-texto", en: "truncate-text" },
    title: { pt: "Cortar Texto", en: "Truncate Text" },
    desc: { pt: "Corte texto por caracteres", en: "Cut text to a character limit" },
    category: "text",
    icon: Scissors,
  },
  {
    id: "dividir-texto",
    slugs: { pt: "dividir-texto", en: "split-text" },
    title: { pt: "Dividir Texto", en: "Split Text" },
    desc: { pt: "Divida textos por delimitador", en: "Split text by a delimiter" },
    category: "text",
    icon: Columns2,
  },
  {
    id: "remover-acentos",
    slugs: { pt: "remover-acentos", en: "remove-accents" },
    title: { pt: "Remover Acentos", en: "Remove Accents" },
    desc: { pt: "Remova acentos de textos", en: "Remove accents from text" },
    category: "text",
    icon: Eraser,
  },
  {
    id: "numeros-por-extenso",
    slugs: { pt: "numeros-por-extenso", en: "number-to-words" },
    title: { pt: "Números por Extenso", en: "Number to Words" },
    desc: { pt: "Converta números para extenso", en: "Spell out numbers in words" },
    category: "text",
    icon: SpellCheck,
  },
  {
    id: "gerar-lorem",
    slugs: { pt: "gerar-lorem", en: "lorem-ipsum-generator" },
    title: { pt: "Gerar Lorem", en: "Lorem Ipsum Generator" },
    desc: { pt: "Gere texto Lorem Ipsum", en: "Generate Lorem Ipsum placeholder text" },
    category: "text",
    icon: FileText,
  },
  {
    id: "calculadora-de-porcentagem",
    slugs: { pt: "calculadora-de-porcentagem", en: "percentage-calculator" },
    title: { pt: "Calculadora de Porcentagem", en: "Percentage Calculator" },
    desc: { pt: "Calcule porcentagens, aumentos e descontos", en: "Calculate percentages, increases and discounts" },
    category: "math",
    icon: Percent,
  },
  {
    id: "calcular-idade",
    slugs: { pt: "calcular-idade", en: "age-calculator" },
    title: { pt: "Calcular Idade", en: "Age Calculator" },
    desc: { pt: "Descubra a idade exata pela data de nascimento", en: "Find your exact age from your date of birth" },
    category: "math",
    icon: Cake,
  },
  {
    id: "calculadora-imc",
    slugs: { pt: "calculadora-imc", en: "bmi-calculator" },
    title: { pt: "Calculadora de IMC", en: "BMI Calculator" },
    desc: { pt: "Calcule o índice de massa corporal", en: "Calculate your body mass index" },
    category: "math",
    icon: Weight,
  },
  {
    id: "calcular-dias-uteis",
    slugs: { pt: "calcular-dias-uteis", en: "business-days-calculator" },
    title: { pt: "Calcular Dias Úteis", en: "Business Days Calculator" },
    desc: { pt: "Dias úteis entre datas e prazos", en: "Business days between dates and deadlines" },
    category: "math",
    icon: CalendarCheck,
  },
  {
    id: "calcular-resto",
    slugs: { pt: "calcular-resto", en: "remainder-calculator" },
    title: { pt: "Calcular Resto", en: "Remainder Calculator" },
    desc: { pt: "Calcule o resto de uma divisão", en: "Calculate the remainder of a division" },
    category: "math",
    icon: Divide,
  },
  {
    id: "calcular-tres",
    slugs: { pt: "calcular-tres", en: "rule-of-three-calculator" },
    title: { pt: "Calcular Três", en: "Rule of Three" },
    desc: { pt: "Regra de três simples", en: "Solve simple proportions" },
    category: "math",
    icon: Scale,
  },
  {
    id: "converter-numeros",
    slugs: { pt: "converter-numeros", en: "number-base-converter" },
    title: { pt: "Converter Números", en: "Number Base Converter" },
    desc: { pt: "Converta entre bases numéricas", en: "Convert between binary, octal, decimal and hex" },
    category: "math",
    icon: Binary,
  },
  {
    id: "converter-temperaturas",
    slugs: { pt: "converter-temperaturas", en: "temperature-converter" },
    title: { pt: "Converter Temperaturas", en: "Temperature Converter" },
    desc: { pt: "Celsius, Fahrenheit e Kelvin", en: "Celsius, Fahrenheit and Kelvin" },
    category: "math",
    icon: Thermometer,
  },
  {
    id: "contar-dias",
    slugs: { pt: "contar-dias", en: "days-between-dates" },
    title: { pt: "Contar Dias", en: "Days Between Dates" },
    desc: { pt: "Conte dias entre duas datas", en: "Count the days between two dates" },
    category: "math",
    icon: CalendarDays,
  },
  {
    id: "gerador-de-senha",
    slugs: { pt: "gerador-de-senha", en: "password-generator" },
    title: { pt: "Gerador de Senha", en: "Password Generator" },
    desc: { pt: "Crie senhas fortes e aleatórias", en: "Create strong random passwords" },
    category: "random",
    icon: KeyRound,
  },
  {
    id: "sorteador-de-nomes",
    slugs: { pt: "sorteador-de-nomes", en: "random-name-picker" },
    title: { pt: "Sorteador de Nomes", en: "Random Name Picker" },
    desc: { pt: "Sorteie nomes de uma lista", en: "Draw names from a list" },
    category: "random",
    icon: Trophy,
  },
  {
    id: "gerar-nomes",
    slugs: { pt: "gerar-nomes", en: "random-name-generator" },
    title: { pt: "Gerar Nomes", en: "Brazilian Name Generator" },
    desc: { pt: "Gere nomes aleatórios", en: "Generate random Brazilian names" },
    category: "random",
    icon: Users,
  },
  {
    id: "gerar-numeros",
    slugs: { pt: "gerar-numeros", en: "random-number-generator" },
    title: { pt: "Gerar Números", en: "Random Number Generator" },
    desc: { pt: "Gere números aleatórios", en: "Generate random numbers" },
    category: "random",
    icon: Dices,
  },
];

export function toolPath(id: string, locale: Locale) {
  const tool = getToolById(id);
  return tool ? `${localePrefix(locale)}/${tool.slugs[locale]}/` : homePath(locale);
}

export function getToolById(id: string) {
  return NAV_TOOLS.find((t) => t.id === id);
}

export function getToolBySlug(slug: string, locale: Locale) {
  return NAV_TOOLS.find((t) => t.slugs[locale] === slug);
}

export function groupToolsByCategory(tools: readonly NavTool[] = NAV_TOOLS) {
  return NAV_CATEGORIES.map((category) => ({
    category,
    tools: tools.filter((t) => t.category === category),
  })).filter((group) => group.tools.length > 0);
}
