import { createContext, useContext } from "react";

export const PathnameContext = createContext("/");

export function usePathname() {
  return useContext(PathnameContext);
}
