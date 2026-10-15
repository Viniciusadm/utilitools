import { DEFAULT_LOCALE, homePath, isLocale, LOCALES, localePrefix, type Locale, type Localized } from "@/lib/i18n";
import { getToolBySlug, NAV_TOOLS, toolPath, type NavTool } from "@/lib/nav-tools";

export type Route =
  | { kind: "home"; locale: Locale }
  | { kind: "tool"; locale: Locale; tool: NavTool }
  | { kind: "not-found"; locale: Locale };

export function resolveRoute(pathname: string): Route {
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const prefix = parts[0];
  const hasPrefix = prefix !== undefined && isLocale(prefix) && prefix !== DEFAULT_LOCALE;
  const locale: Locale = hasPrefix ? prefix : DEFAULT_LOCALE;
  if (hasPrefix) parts.shift();
  if (parts.length === 0) return { kind: "home", locale };
  const tool = parts.length === 1 ? getToolBySlug(parts[0], locale) : undefined;
  return tool ? { kind: "tool", locale, tool } : { kind: "not-found", locale };
}

export function routePath(route: Route) {
  switch (route.kind) {
    case "home":
      return homePath(route.locale);
    case "tool":
      return toolPath(route.tool.id, route.locale);
    case "not-found":
      return `${localePrefix(route.locale)}/404`;
  }
}

export function alternatePaths(route: Route): Localized<string> | undefined {
  if (route.kind === "not-found") return undefined;
  return Object.fromEntries(LOCALES.map((locale) => [locale, routePath({ ...route, locale })])) as Localized<string>;
}

export function staticRoutes(): Route[] {
  return LOCALES.flatMap((locale) => [
    { kind: "home", locale } as const,
    ...NAV_TOOLS.map((tool) => ({ kind: "tool", locale, tool }) as const),
  ]);
}
