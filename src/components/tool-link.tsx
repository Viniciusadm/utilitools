import type { ComponentProps } from "react";

import { useLocale } from "@/lib/i18n";
import { getToolById, toolPath } from "@/lib/nav-tools";

type ToolLinkProps = Omit<ComponentProps<"a">, "href"> & { id: string };

export function ToolLink({ id, children, ...props }: ToolLinkProps) {
  const locale = useLocale();
  return (
    <a href={toolPath(id, locale)} {...props}>
      {children ?? getToolById(id)?.title[locale]}
    </a>
  );
}
