import React from "react";
import styles from "./ServiceResume.module.css";
import { SiteData } from "../../service_data";

import { SiteContext } from "../../hooks/use_site_context";
import Layout from "../Layout";
import { Header } from "./Header";
import { Body } from "./Body";

function App() {
  return (
    <SiteContext.Provider value={{ ...SiteData }}>
      <Layout>
        <div className={styles["container__app"]}>
          <Header />
          <hr />
          <Body>
            <Body.Experience />
            <Body.Education />
            <Body.Achievements />
            <Body.Skills />
          </Body>
        </div>
      </Layout>
    </SiteContext.Provider>
  );
}

export { App };
