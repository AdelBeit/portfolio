import React from "react";
import styles from "./ServiceResume.module.css";

import Layout from "../Layout";
import { Header } from "./Header";
import { Achievements, Body, Education, Experience, Skills } from "./Body";
import { ServiceContext } from "../../hooks/use_site_context";
import { SiteData } from "../../service.data";

function App() {
  return (
    <ServiceContext.Provider value={SiteData}>
      <Layout>
        <div className={styles["container__app"]}>
          <Header />
          <hr />
          <Body>
            <Experience />
            <Education />
            <Achievements />
            <Skills />
          </Body>
        </div>
      </Layout>
    </ServiceContext.Provider>
  );
}

export { App };
