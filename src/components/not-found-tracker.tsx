import { useEffect } from "react";

export function NotFoundTracker() {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return null;
}
