import type { ToolSeo } from "@/lib/tool-seo";
import { SEO as DOCUMENTS_CPF_CNPJ_CNH } from "./documents-cpf-cnpj-cnh";
import { SEO as DOCUMENTS_OTHER } from "./documents-other";
import { SEO as FINANCE_RANDOM } from "./finance-random";
import { SEO as MATH } from "./math";
import { SEO as TEXT } from "./text";

export const TOOL_SEO_EN: Readonly<Record<string, ToolSeo>> = {
  ...DOCUMENTS_CPF_CNPJ_CNH,
  ...DOCUMENTS_OTHER,
  ...FINANCE_RANDOM,
  ...MATH,
  ...TEXT,
};
