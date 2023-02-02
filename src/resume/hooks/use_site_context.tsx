import { Context, createContext, useContext } from "react";
import { SiteData as DevelopmentData } from "../development_data";
import { SiteData as ServiceData } from "../service_data";

function createUseSite<T>(SiteContext: Context<T>) {
  return () => {
    const site = useContext<T>(SiteContext);

    if (!site) {
      console.trace("useSite must be used within a PortfolioProvider");
      throw new Error("useSite must be used within a PortfolioProvider");
    }

    return site;
  };
}

function createSiteContext<T>() {
  const SiteContext = createContext<T | null>(null);
  const useSite = createUseSite(SiteContext);
  return { SiteContext, useSite };
}

const { SiteContext: ServiceContext, useSite: useService } =
  createSiteContext<typeof ServiceData>();
const { SiteContext: DevContext, useSite: useDev } =
  createSiteContext<typeof DevelopmentData>();

export { ServiceContext, useService, DevContext, useDev };
