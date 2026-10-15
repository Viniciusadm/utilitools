import type { ComponentType } from "react";

import { AppLayout } from "@/components/AppLayout";
import { NotFoundTracker } from "@/components/not-found-tracker";
import { ToolDirectory } from "@/components/tool-directory";
import { useUiCopy } from "@/i18n/ui";
import { homePath, LocaleContext, useLocale } from "@/lib/i18n";
import { CATEGORY_LABELS, type NavCategory } from "@/lib/nav-tools";
import { PathnameContext } from "@/lib/pathname";
import { alternatePaths, routePath, type Route } from "./routes";

function Home() {
  const copy = useUiCopy();
  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{copy.home.heading}</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{copy.home.intro}</p>
      </header>
      <ToolDirectory />
    </div>
  );
}

function ToolPage({ category, Tool }: { category: NavCategory; Tool: ComponentType }) {
  const locale = useLocale();
  const copy = useUiCopy();
  return (
    <>
      <nav aria-label={copy.breadcrumbLabel} className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <a href={homePath(locale)} className="hover:text-foreground transition-colors">
              {copy.home.breadcrumb}
            </a>
          </li>
          <li aria-hidden>/</li>
          <li>{CATEGORY_LABELS[category][locale]}</li>
        </ol>
      </nav>
      <Tool />
    </>
  );
}

function NotFound() {
  const locale = useLocale();
  const copy = useUiCopy();
  return (
    <>
      <NotFoundTracker />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">{copy.notFound.message}</p>
          <a href={homePath(locale)} className="text-primary underline hover:text-primary/90">
            {copy.notFound.back}
          </a>
        </div>
      </div>
    </>
  );
}

function PageContent({ route, Tool }: { route: Route; Tool?: ComponentType }) {
  const alternates = alternatePaths(route);
  if (route.kind === "not-found" || !alternates || (route.kind === "tool" && !Tool)) {
    return <NotFound />;
  }

  return (
    <PathnameContext value={routePath(route)}>
      <AppLayout alternates={alternates}>
        {route.kind === "tool" && Tool ? <ToolPage category={route.tool.category} Tool={Tool} /> : <Home />}
      </AppLayout>
    </PathnameContext>
  );
}

export function Page({ route, Tool }: { route: Route; Tool?: ComponentType }) {
  return (
    <LocaleContext value={route.locale}>
      <PageContent route={route} Tool={Tool} />
    </LocaleContext>
  );
}
