"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  activeClassName?: string;
  end?: boolean;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, end = false, href, ...props }, ref) => {
    const pathname = usePathname();
    const hrefStr = typeof href === "string" ? href : `${href.pathname ?? ""}`;
    const isActive = end
      ? pathname === hrefStr
      : hrefStr !== "" && pathname.startsWith(hrefStr);

    return (
      <Link ref={ref} href={href} className={cn(className, isActive && activeClassName)} {...props} />
    );
  },
);

NavLink.displayName = "NavLink";
