import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import "./index.css";
import { loadTool } from "@/components/tools/tool-view";
import { HTML_LANG, LOCALES } from "@/lib/i18n";
import { Page } from "./Page";
import { resolveRoute, type Route } from "./routes";

function currentRoute(): Route {
  const route = resolveRoute(window.location.pathname);
  if (route.kind !== "not-found") return route;
  const documentLocale = LOCALES.find((locale) => HTML_LANG[locale] === document.documentElement.lang);
  return documentLocale ? { ...route, locale: documentLocale } : route;
}

const route = currentRoute();
const Tool = route.kind === "tool" ? await loadTool(route.tool.id) : undefined;

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
