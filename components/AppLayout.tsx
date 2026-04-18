"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-background sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <Link href="/" className="text-lg font-bold text-foreground tracking-tight">
                UtiliTools
              </Link>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8 max-w-4xl w-full mx-auto">{children}</main>

          <footer className="border-t border-border py-6 px-4 text-center text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">UtiliTools</span>
            {" · "}by Viniciusadm{" · "}2023 - 2026
          </footer>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
