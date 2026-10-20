import type { ReactNode } from "react";

export function ToolSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-2">{title}</h2>
      <div className="space-y-3 text-[15px] leading-7 text-muted-foreground [&_ol]:list-decimal [&_ol]:list-inside [&_ul]:list-disc [&_ul]:list-inside [&_li]:mt-1 [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-foreground">
        {children}
      </div>
    </section>
  );
}
