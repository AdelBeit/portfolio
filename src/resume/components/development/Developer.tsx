import React, { useEffect } from "react";
import { SiteData } from "../../development.data";
import { DevContext } from "../../hooks/use_site_context";
import Layout from "../Layout";
import styles from "./Developer.module.css";
import { TitleSection } from "./TitleSection";
import { Products } from "./Products";
import { Employment } from "./Employment";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Extras } from "./Extras";
import cs from "classnames";
import DownloadButton from "../DownloadButton";

function App() {
  const keypress = (e: KeyboardEvent) => {
    if (e.key === "d") {
      e.preventDefault();
      document.querySelector("#_page").classList.toggle(styles.print_view);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keypress);
    return () => {
      document.removeEventListener("keydown", keypress);
    };
  }, []);
  return (
    <>
      {SiteData && (
        <DevContext.Provider value={{ ...SiteData }}>
          <Layout>
            <div id="_page" className={cs(styles.container)}>
              <div className={styles.subcontainer}>
                <DownloadButton />
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
