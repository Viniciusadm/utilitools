import type { ComponentType } from "react";

import { AppLayout } from "@/components/AppLayout";
import { NotFoundTracker } from "@/components/not-found-tracker";
import { ToolDirectory } from "@/components/tool-directory";
import { PathnameContext } from "@/lib/pathname";
import { routePath, type Route } from "./routes";

function Home() {
  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Ferramentas para o dia a dia
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Gere e valide documentos, edite textos e faça contas rápidas. Tudo roda no seu navegador, grátis e sem
          cadastro.
        </p>
      </header>
      <ToolDirectory />
    </div>
  );
}

function ToolPage({ category, Tool }: { category: string; Tool: ComponentType }) {
  return (
    <>
      <nav aria-label="Navegação estrutural" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <a href="/" className="hover:text-foreground transition-colors">
              Início
            </a>
          </li>
          <li aria-hidden>/</li>
          <li>{category}</li>
        </ol>
      </nav>
      <Tool />
    </>
  );
}

function NotFound() {
  return (
    <>
      <NotFoundTracker />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
}

export function Page({ route, Tool }: { route: Route; Tool?: ComponentType }) {
  if (route.kind === "not-found" || (route.kind === "tool" && !Tool)) {
    return <NotFound />;
  }

  return (
    <PathnameContext value={routePath(route)}>
      <AppLayout>{route.kind === "tool" && Tool ? <ToolPage category={route.tool.category} Tool={Tool} /> : <Home />}</AppLayout>
    </PathnameContext>
  );
}
