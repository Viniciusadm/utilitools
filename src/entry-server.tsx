import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import { loadTool } from "@/components/tools/tool-view";
import { Page } from "./Page";
import type { Route } from "./routes";

export { renderHead } from "./head";
export { resolveRoute } from "./routes";
export { NAV_TOOL_SEGMENTS } from "@/lib/nav-tools";
export { absoluteUrl } from "@/lib/site";

export async function render(route: Route) {
  const Tool = route.kind === "tool" ? await loadTool(route.segment) : undefined;
  return renderToString(
    <StrictMode>
      <Page route={route} Tool={Tool} />
    </StrictMode>,
  );
}
