import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import { loadTool } from "@/components/tools/tool-view";
import { Page } from "./Page";
import type { Route } from "./routes";

export { renderHead, renderHtmlLang } from "./head";
export { renderLlmsTxt } from "./llms";
export { alternatePaths, resolveRoute, routePath, staticRoutes } from "./routes";
export { HTML_LANG, LOCALES } from "@/lib/i18n";
export { absoluteUrl } from "@/lib/site";

export async function render(route: Route) {
  const Tool = route.kind === "tool" ? await loadTool(route.tool.id) : undefined;
  return renderToString(
    <StrictMode>
      <Page route={route} Tool={Tool} />
    </StrictMode>,
  );
}
