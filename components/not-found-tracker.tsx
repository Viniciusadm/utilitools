"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function NotFoundTracker() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return null;
}
