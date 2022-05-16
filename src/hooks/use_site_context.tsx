import { createContext, useContext } from "react";
import { SiteData as DevelopmentData } from "../development_data";
import { SiteData as ServiceData } from "../service_data";

const Context = { ...DevelopmentData, ...ServiceData };

const SiteContext = createContext<Partial<typeof Context> | undefined>(
  undefined
);

function useSite() {
  const site = useContext(SiteContext);

  if (!site) {
    console.trace("useSite must be used within a PortfolioProvider");
    throw new Error("useSite must be used within a PortfolioProvider");
  }

  return site;
}

export type { Context };
export { useSite, SiteContext };
