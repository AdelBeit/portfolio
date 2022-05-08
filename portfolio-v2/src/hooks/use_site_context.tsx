import { createContext, useContext } from "react";
import { SiteData as SiteContextType } from "../data";

const SiteContext = createContext<SiteContextType | undefined>(undefined);

function useSite() {
  const site = useContext(SiteContext);

  return site;
}

export type { SiteContextType };
export { SiteContext, useSite };
