import { getNavToolBySegment, type NavTool } from "@/lib/nav-tools";

export type Route =
  | { kind: "home" }
  | { kind: "tool"; tool: NavTool; segment: string }
  | { kind: "not-found" };

export function resolveRoute(pathname: string): Route {
  const segment = pathname.replace(/^\/+|\/+$/g, "");
  if (segment === "") return { kind: "home" };
  const tool = getNavToolBySegment(segment);
  return tool ? { kind: "tool", tool, segment } : { kind: "not-found" };
}

export function routePath(route: Route) {
  switch (route.kind) {
    case "home":
      return "/";
    case "tool":
      return `/${route.segment}/`;
    case "not-found":
      return "/404";
  }
}
