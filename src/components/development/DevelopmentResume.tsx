import React from "react";
import { SiteData } from "../../development_data";
import { SiteContext } from "../../hooks/use_site_context";
import Layout from "../Layout";
import styles from "./DevelopmentResume.module.css";
import { Main } from "./Main";
import { Side } from "./Side";

function App() {
  return (
    <>
      {SiteData && (
        <SiteContext.Provider value={{ ...SiteData }}>
          <Layout>
            <div className={styles["container__app"]}>
              <Main />
              <Side />
            </div>
          </Layout>
        </SiteContext.Provider>
      )}
    </>
  );
}

export { App };
