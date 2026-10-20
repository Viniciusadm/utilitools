import { CATEGORY_LABELS, groupToolsByCategory, toolPath } from "@/lib/nav-tools";
import { absoluteUrl } from "@/lib/site";
import { getToolSeo } from "@/lib/tool-seo";

export function renderLlmsTxt() {
  const sections = groupToolsByCategory().map(({ category, tools }) => {
    const links = tools.map((tool) => {
      const description = getToolSeo(tool.id, "en")?.description ?? tool.desc.en;
      return `- [${tool.title.en}](${absoluteUrl(toolPath(tool.id, "en"))}): ${description}`;
    });
    return [`## ${CATEGORY_LABELS[category].en}`, "", ...links].join("\n");
  });

  return [
    "# UtiliTools",
    "",
    "> Free online tools: generators and validators for Brazilian documents (CPF, CNPJ, CNH, RG, PIS, voter ID, RENAVAM) and test credit cards, finance calculators, text editors, converters, calculators, random data generators and developer tools (JSON formatter, Base64, UUID, hash, JWT decoder, Unix timestamp, regex tester, URL encoder and slug generator).",
    "",
    "Every tool runs entirely in the browser, with no sign-up and no data sent to a server. Generated documents are fictitious and intended for software testing only. The site is available in English (under /en/) and Brazilian Portuguese (at the root).",
    "",
    ...sections.flatMap((section) => [section, ""]),
    "## Optional",
    "",
    `- [UtiliTools em português](${absoluteUrl("/")}): Portuguese version of the site with the same tools.`,
    "",
  ].join("\n");
}
