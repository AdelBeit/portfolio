import React from "react";
import styles from "./Main.module.css";
import { Header } from "../development/Header";
import { Projects, Experience } from "./Body";

function Main() {
  return (
    <div className={styles.container__main}>
      <Header />
      <Projects />
      <Experience />
    </div>
  );
}

export { Main };
