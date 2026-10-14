import {
  Binary,
  Building2,
  Cake,
  CalendarDays,
  Car,
  Columns2,
  Dices,
  Divide,
  Eraser,
  FileText,
  IdCard,
  KeyRound,
  LetterText,
  PencilLine,
  Percent,
  Scale,
  Scissors,
  ShieldCheck,
  SpellCheck,
  Thermometer,
  Trophy,
  Users,
  WholeWord,
  type LucideIcon,
} from "lucide-react";

export const NAV_CATEGORIES = ["Documentos", "Texto", "Matemática", "Dados aleatórios"] as const;

export type NavCategory = (typeof NAV_CATEGORIES)[number];

export type NavTool = {
  title: string;
  url: string;
  desc: string;
  category: NavCategory;
  icon: LucideIcon;
};

export const NAV_TOOLS: readonly NavTool[] = [
  { title: "Gerar CPF", url: "/gerar-cpf", desc: "Gere CPFs válidos", category: "Documentos", icon: IdCard },
  { title: "Validar CPF", url: "/validar-cpf", desc: "Valide números de CPF", category: "Documentos", icon: ShieldCheck },
  { title: "Gerar CNPJ", url: "/gerar-cnpj", desc: "Gere CNPJs válidos", category: "Documentos", icon: Building2 },
  { title: "Validar CNPJ", url: "/validar-cnpj", desc: "Valide números de CNPJ", category: "Documentos", icon: ShieldCheck },
  { title: "Gerar CNH", url: "/gerar-cnh", desc: "Gere números de CNH", category: "Documentos", icon: Car },
  { title: "Validar CNH", url: "/validar-cnh", desc: "Valide números de CNH", category: "Documentos", icon: ShieldCheck },
  { title: "Gerar RG SP", url: "/gerar-rg", desc: "Gere números de RG", category: "Documentos", icon: IdCard },
  { title: "Validar RG SP", url: "/validar-rg", desc: "Valide números de RG", category: "Documentos", icon: ShieldCheck },
  { title: "Gerar RG RJ", url: "/gerar-rj", desc: "Gere inscrições estaduais RJ", category: "Documentos", icon: IdCard },
  { title: "Validar RG RJ", url: "/validar-rj", desc: "Valide inscrições estaduais RJ", category: "Documentos", icon: ShieldCheck },
  { title: "Contador de Caracteres", url: "/contador-de-caracteres", desc: "Conte caracteres, palavras e linhas", category: "Texto", icon: LetterText },
  { title: "Editar Texto", url: "/editar-texto", desc: "Edite e formate textos", category: "Texto", icon: PencilLine },
  { title: "Editar Palavras", url: "/editar-palavras", desc: "Transforme palavras", category: "Texto", icon: WholeWord },
  { title: "Cortar Texto", url: "/cortar-texto", desc: "Corte texto por caracteres", category: "Texto", icon: Scissors },
  { title: "Dividir Texto", url: "/dividir-texto", desc: "Divida textos por delimitador", category: "Texto", icon: Columns2 },
  { title: "Remover Acentos", url: "/remover-acentos", desc: "Remova acentos de textos", category: "Texto", icon: Eraser },
  { title: "Números por Extenso", url: "/numeros-por-extenso", desc: "Converta números para extenso", category: "Texto", icon: SpellCheck },
  { title: "Gerar Lorem", url: "/gerar-lorem", desc: "Gere texto Lorem Ipsum", category: "Texto", icon: FileText },
  { title: "Calculadora de Porcentagem", url: "/calculadora-de-porcentagem", desc: "Calcule porcentagens, aumentos e descontos", category: "Matemática", icon: Percent },
  { title: "Calcular Idade", url: "/calcular-idade", desc: "Descubra a idade exata pela data de nascimento", category: "Matemática", icon: Cake },
  { title: "Calcular Resto", url: "/calcular-resto", desc: "Calcule o resto de uma divisão", category: "Matemática", icon: Divide },
  { title: "Calcular Três", url: "/calcular-tres", desc: "Regra de três simples", category: "Matemática", icon: Scale },
  { title: "Converter Números", url: "/converter-numeros", desc: "Converta entre bases numéricas", category: "Matemática", icon: Binary },
  { title: "Converter Temperaturas", url: "/converter-temperaturas", desc: "Celsius, Fahrenheit e Kelvin", category: "Matemática", icon: Thermometer },
  { title: "Contar Dias", url: "/contar-dias", desc: "Conte dias entre duas datas", category: "Matemática", icon: CalendarDays },
  { title: "Gerador de Senha", url: "/gerador-de-senha", desc: "Crie senhas fortes e aleatórias", category: "Dados aleatórios", icon: KeyRound },
  { title: "Sorteador de Nomes", url: "/sorteador-de-nomes", desc: "Sorteie nomes de uma lista", category: "Dados aleatórios", icon: Trophy },
  { title: "Gerar Nomes", url: "/gerar-nomes", desc: "Gere nomes aleatórios", category: "Dados aleatórios", icon: Users },
  { title: "Gerar Números", url: "/gerar-numeros", desc: "Gere números aleatórios", category: "Dados aleatórios", icon: Dices },
];

export const NAV_TOOL_SEGMENTS = NAV_TOOLS.map((t) => t.url.slice(1));

export function getNavToolBySegment(segment: string) {
  return NAV_TOOLS.find((t) => t.url === `/${segment}`);
}

export function groupToolsByCategory(tools: readonly NavTool[] = NAV_TOOLS) {
  return NAV_CATEGORIES.map((category) => ({
    category,
    tools: tools.filter((t) => t.category === category),
  })).filter((group) => group.tools.length > 0);
}
