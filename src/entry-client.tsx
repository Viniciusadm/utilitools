import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import "./index.css";
import { loadTool } from "@/components/tools/tool-view";
import { Page } from "./Page";
import { resolveRoute } from "./routes";

const route = resolveRoute(window.location.pathname);
const Tool = route.kind === "tool" ? await loadTool(route.segment) : undefined;

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Page route={route} Tool={Tool} />
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
