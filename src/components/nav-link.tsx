import { forwardRef, type ComponentProps } from "react";

import { usePathname } from "@/lib/pathname";
import { cn } from "@/lib/utils";

type NavLinkProps = Omit<ComponentProps<"a">, "className" | "href"> & {
  href: string;
  className?: string;
  activeClassName?: string;
  end?: boolean;
};

function stripTrailingSlash(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, end = false, href, ...props }, ref) => {
    const pathname = stripTrailingSlash(usePathname());
    const hrefStr = stripTrailingSlash(href);
    const isActive = end
      ? pathname === hrefStr
      : hrefStr !== "" && pathname.startsWith(hrefStr);

    return <a ref={ref} href={href} className={cn(className, isActive && activeClassName)} {...props} />;
  },
);

NavLink.displayName = "NavLink";
