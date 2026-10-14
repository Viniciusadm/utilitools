import type { ComponentType } from "react";

type ToolModule = { default: ComponentType };

export const toolLoaders: Record<string, () => Promise<ToolModule>> = {
  "calcular-resto": () => import("./divide-remainder"),
  "calcular-tres": () => import("./rule-of-three"),
  "converter-numeros": () => import("./radix-converter"),
  "converter-temperaturas": () => import("./temperature-converter"),
  "contar-dias": () => import("./count-days"),
  "cortar-texto": () => import("./truncate-text"),
  "editar-palavras": () => import("./edit-words"),
  "editar-texto": () => import("./edit-text"),
  "gerar-cpf": () => import("./generate-cpf"),
  "gerar-cnh": () => import("./generate-cnh"),
  "gerar-rj": () => import("./generate-rg-rj"),
  "gerar-rg": () => import("./generate-rg-sp"),
  "gerar-lorem": () => import("./generate-lorem"),
  "gerar-nomes": () => import("./generate-names"),
  "gerar-numeros": () => import("./generate-numbers"),
  "gerar-cnpj": () => import("./generate-cnpj"),
  "numeros-por-extenso": () => import("./numbers-spell-out"),
  "remover-acentos": () => import("./strip-diacritics"),
  "dividir-texto": () => import("./split-text"),
  "validar-cnh": () => import("./validate-cnh"),
  "validar-rj": () => import("./validate-rg-rj"),
  "validar-rg": () => import("./validate-rg-sp"),
  "validar-cnpj": () => import("./validate-cnpj"),
  "validar-cpf": () => import("./validate-cpf"),
};

export async function loadTool(segment: string) {
  const loader = toolLoaders[segment];
  if (!loader) return undefined;
  const { default: Tool } = await loader();
  return Tool;
}
