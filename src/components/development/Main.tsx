import React from "react";
import styles from "./Main.module.css";
import { Header } from "../development/Header";
import { Body } from "./Body";

function Main() {
  return (
    <div className={styles.container__main}>
      <Header />
      <Body.Experience />
      <Body.Projects />
    </div>
  );
}

export { Main };
