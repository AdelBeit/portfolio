import React from "react";
import styles from "./Section.module.css";

function Section({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles["section__"] + " " + styles[title.toLowerCase()]}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export { Section };
