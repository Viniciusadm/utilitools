import type { ComponentType } from "react";

type ToolModule = { default: ComponentType };

export const toolLoaders: Record<string, () => Promise<ToolModule>> = {
  "calculadora-de-juros-compostos": () => import("./compound-interest"),
  "calculadora-de-porcentagem": () => import("./percentage-calculator"),
  "calculadora-imc": () => import("./bmi-calculator"),
  "calcular-dias-uteis": () => import("./business-days"),
  "calcular-idade": () => import("./age-calculator"),
  "calcular-resto": () => import("./divide-remainder"),
  "calcular-tres": () => import("./rule-of-three"),
  "converter-numeros": () => import("./radix-converter"),
  "converter-temperaturas": () => import("./temperature-converter"),
  "cnpj-alfanumerico": () => import("./cnpj-alphanumeric"),
  "contador-de-caracteres": () => import("./character-counter"),
  "contar-dias": () => import("./count-days"),
  "cortar-texto": () => import("./truncate-text"),
  "editar-palavras": () => import("./edit-words"),
  "editar-texto": () => import("./edit-text"),
  "gerador-de-qr-code-pix": () => import("./pix-qr-code"),
  "gerar-cartao-de-credito": () => import("./generate-credit-card"),
  "gerar-cpf": () => import("./generate-cpf"),
  "gerar-pis": () => import("./generate-pis"),
  "gerar-renavam": () => import("./generate-renavam"),
  "gerar-titulo-de-eleitor": () => import("./generate-voter-id"),
  "gerar-cnh": () => import("./generate-cnh"),
  "gerar-rj": () => import("./generate-rg-rj"),
  "gerar-rg": () => import("./generate-rg-sp"),
  "gerar-lorem": () => import("./generate-lorem"),
  "gerar-nomes": () => import("./generate-names"),
  "gerar-numeros": () => import("./generate-numbers"),
  "gerador-de-senha": () => import("./password-generator"),
  "gerar-cnpj": () => import("./generate-cnpj"),
  "numeros-por-extenso": () => import("./numbers-spell-out"),
  "remover-acentos": () => import("./strip-diacritics"),
  "sorteador-de-nomes": () => import("./name-draw"),
  "dividir-texto": () => import("./split-text"),
  "validar-cartao-de-credito": () => import("./validate-credit-card"),
  "validar-cnh": () => import("./validate-cnh"),
  "validar-pis": () => import("./validate-pis"),
  "validar-renavam": () => import("./validate-renavam"),
  "validar-titulo-de-eleitor": () => import("./validate-voter-id"),
  "validar-rj": () => import("./validate-rg-rj"),
  "validar-rg": () => import("./validate-rg-sp"),
  "validar-cnpj": () => import("./validate-cnpj"),
  "validar-cpf": () => import("./validate-cpf"),
  "formatar-json": () => import("./json-formatter"),
  "codificar-base64": () => import("./base64"),
  "gerador-de-uuid": () => import("./uuid-generator"),
  "gerador-de-hash": () => import("./hash-generator"),
  "codificar-url": () => import("./url-encoder"),
  "decodificar-jwt": () => import("./jwt-decoder"),
  "converter-timestamp": () => import("./unix-timestamp"),
  "testar-regex": () => import("./regex-tester"),
  "gerador-de-slug": () => import("./slug-generator"),
};

export async function loadTool(id: string) {
  const loader = toolLoaders[id];
  if (!loader) return undefined;
  const { default: Tool } = await loader();
  return Tool;
}
