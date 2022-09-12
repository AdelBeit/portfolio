import React from "react";
import { Education, Info, Languages, Tools } from "./Body";
import styles from "./Side.module.css";

function Side() {
  return (
    <div className={styles.container__side}>
      <Info />
      <Education />
      <Languages />
      <Tools />
    </div>
  );
}

export { Side };
