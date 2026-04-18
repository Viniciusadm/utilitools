export const NAV_TOOLS = [
  { title: "Calcular Resto", url: "/calcular-resto", desc: "Calcule o resto de uma divisão" },
  { title: "Calcular Três", url: "/calcular-tres", desc: "Regra de três simples" },
  { title: "Converter Números", url: "/converter-numeros", desc: "Converta entre bases numéricas" },
  { title: "Converter Temperaturas", url: "/converter-temperaturas", desc: "Celsius, Fahrenheit e Kelvin" },
  { title: "Contar Dias", url: "/contar-dias", desc: "Conte dias entre duas datas" },
  { title: "Cortar Texto", url: "/cortar-texto", desc: "Corte texto por caracteres" },
  { title: "Editar Palavras", url: "/editar-palavras", desc: "Transforme palavras" },
  { title: "Editar Texto", url: "/editar-texto", desc: "Edite e formate textos" },
  { title: "Gerar CPF", url: "/gerar-cpf", desc: "Gere CPFs válidos" },
  { title: "Gerar CNH", url: "/gerar-cnh", desc: "Gere números de CNH" },
  { title: "Gerar RG RJ", url: "/gerar-rj", desc: "Gere inscrições estaduais RJ" },
  { title: "Gerar RG SP", url: "/gerar-rg", desc: "Gere números de RG" },
  { title: "Gerar Lorem", url: "/gerar-lorem", desc: "Gere texto Lorem Ipsum" },
  { title: "Gerar Nomes", url: "/gerar-nomes", desc: "Gere nomes aleatórios" },
  { title: "Gerar Números", url: "/gerar-numeros", desc: "Gere números aleatórios" },
  { title: "Gerar CNPJ", url: "/gerar-cnpj", desc: "Gere CNPJs válidos" },
  { title: "Números por Extenso", url: "/numeros-por-extenso", desc: "Converta números para extenso" },
  { title: "Remover Acentos", url: "/remover-acentos", desc: "Remova acentos de textos" },
  { title: "Dividir Texto", url: "/dividir-texto", desc: "Divida textos por delimitador" },
  { title: "Validar CNH", url: "/validar-cnh", desc: "Valide números de CNH" },
  { title: "Validar RG RJ", url: "/validar-rj", desc: "Valide inscrições estaduais RJ" },
  { title: "Validar RG SP", url: "/validar-rg", desc: "Valide números de RG" },
  { title: "Validar CNPJ", url: "/validar-cnpj", desc: "Valide números de CNPJ" },
  { title: "Validar CPF", url: "/validar-cpf", desc: "Valide números de CPF" },
] as const;

export const NAV_TOOL_SEGMENTS = NAV_TOOLS.map((t) => t.url.slice(1));

export function getNavToolBySegment(segment: string) {
  return NAV_TOOLS.find((t) => t.url === `/${segment}`);
}
