import React from "react";
import { Body } from "./Body";
import styles from "./Side.module.css";

function Side() {
  return (
    <div className={styles.container__side}>
      <Body.Info />
      <Body.Education />
      <Body.Languages />
      <Body.Tools />
    </div>
  );
}

export { Side };
