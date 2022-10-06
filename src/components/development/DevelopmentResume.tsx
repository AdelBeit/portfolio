import React from "react";
import { SiteData } from "../../development_data";
import { DevContext } from "../../hooks/use_site_context";
import Layout from "../Layout";
import styles from "./DevelopmentResume.module.css";
import { Main } from "./Main";
import { Side } from "./Side";

function App() {
  return (
    <>
      {SiteData && (
        <DevContext.Provider value={{ ...SiteData }}>
          <Layout>
            <div className={styles["container__app"]}>
              <Main />
              <Side />
            </div>
          </Layout>
        </DevContext.Provider>
      )}
    </>
  );
}

export { App };
