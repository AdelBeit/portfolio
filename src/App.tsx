import React from "react";
import styles from "./App.module.css";
import { SiteData } from "./data";

import { SiteContext } from "./hooks/use_site_context";
import Layout from "./components/Layout";
import { Header } from "./components/Header";
import { Body } from "./components/Body";

export default function App() {
  return (
    <SiteContext.Provider value={{ ...SiteData }}>
      <Layout title="Adele">
        <div className={styles["container__app"]}>
          <Header />
          <hr />
          <Body />
        </div>
      </Layout>
    </SiteContext.Provider>
  );
}
