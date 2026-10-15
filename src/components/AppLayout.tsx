
import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { LanguageSwitcher } from "@/components/language-switcher";
import { homePath, useLocale, type Localized } from "@/lib/i18n";

export function AppLayout({ children, alternates }: { children: ReactNode; alternates: Localized<string> }) {
  const locale = useLocale();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          <header className="h-14 flex items-center justify-between gap-3 border-b border-border px-4 bg-background/80 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <a
                href={homePath(locale)}
                className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  aria-hidden
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground"
                >
                  U
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-foreground">UtiliTools</span>
              </a>
            </div>
            <LanguageSwitcher alternates={alternates} />
          </header>

          <main className="flex-1 px-5 py-10 md:px-10 md:py-14 max-w-4xl w-full mx-auto">{children}</main>

          <footer className="border-t border-border">
            <div className="max-w-4xl mx-auto px-5 md:px-10 py-6 text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">UtiliTools</span>
              {" · "}by Viniciusadm{" · "}2023 - 2026
            </div>
          </footer>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
