import { useCopy } from "@/lib/i18n";

const pt = {
  home: {
    heading: "Ferramentas para o dia a dia",
    intro: "Gere e valide documentos, edite textos e faça contas rápidas. Tudo roda no seu navegador, grátis e sem cadastro.",
    link: "Página inicial",
    breadcrumb: "Início",
  },
  breadcrumbLabel: "Navegação estrutural",
  languageLabel: "Idioma",
  directory: {
    search: "Buscar ferramenta",
    empty: "Nenhuma ferramenta encontrada. Tente “CPF” ou “texto”.",
    count: (n: number) => `${n} ${n === 1 ? "ferramenta" : "ferramentas"}`,
  },
  related: "Veja também:",
  faq: "Perguntas frequentes",
  copied: "Copiado para a área de transferência",
  notFound: {
    message: "Ops! Página não encontrada",
    back: "Voltar para o início",
  },
  generator: {
    switchToValidate: "Deseja validar em vez de gerar?",
    punctuation: "Pontuação?",
    yes: "Sim",
    no: "Não",
    separator: "Separador",
    newline: "Quebra de linha",
    comma: "Vírgula",
    quantity: "Quantidade",
    generate: "Gerar",
    copy: "Copiar",
  },
  validator: {
    switchToGenerate: "Deseja gerar em vez de validar?",
    validate: "Validar",
    valid: (name: string) => `${name} válido`,
    invalid: (name: string) => `${name} inválido`,
    validDetail: "O número informado possui dígito verificador correto.",
    invalidDetail: "O número informado não possui dígito verificador válido.",
  },
};

const en: typeof pt = {
  home: {
    heading: "Everyday online tools",
    intro: "Generate and validate documents, edit text and run quick calculations. Everything runs in your browser, free and with no sign-up.",
    link: "Home",
    breadcrumb: "Home",
  },
  breadcrumbLabel: "Breadcrumb",
  languageLabel: "Language",
  directory: {
    search: "Search tools",
    empty: "No tools found. Try “CPF” or “text”.",
    count: (n: number) => `${n} ${n === 1 ? "tool" : "tools"}`,
  },
  related: "See also:",
  faq: "Frequently asked questions",
  copied: "Copied to clipboard",
  notFound: {
    message: "Oops! Page not found",
    back: "Back to home",
  },
  generator: {
    switchToValidate: "Want to validate instead?",
    punctuation: "Formatting?",
    yes: "Yes",
    no: "No",
    separator: "Separator",
    newline: "Line break",
    comma: "Comma",
    quantity: "Quantity",
    generate: "Generate",
    copy: "Copy",
  },
  validator: {
    switchToGenerate: "Want to generate instead?",
    validate: "Validate",
    valid: (name: string) => `Valid ${name}`,
    invalid: (name: string) => `Invalid ${name}`,
    validDetail: "The number has correct check digits.",
    invalidDetail: "The number does not have valid check digits.",
  },
};

export const UI_COPY = { pt, en };

export function useUiCopy() {
  return useCopy(UI_COPY);
}
