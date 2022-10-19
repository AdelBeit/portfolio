import React from "react";
import { SiteData } from "../../development_data";
import { DevContext } from "../../hooks/use_site_context";
import Layout from "../Layout";
import styles from "./Developer.module.css";
import { TitleSection } from "./TitleSection";
import { Products } from "./Products";
import { Employment } from "./Employment";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Extras } from "./Extras";

function App() {
  return (
    <>
      {SiteData && (
        <DevContext.Provider value={{ ...SiteData }}>
          <Layout>
            <div className={styles.container}>
              <div className={styles.subcontainer}>
                <TitleSection />
                <Products />
                <Employment />
                <Education />
                <Skills />
                <Extras />
              </div>
            </div>
          </Layout>
        </DevContext.Provider>
      )}
    </>
  );
}

export { App };
