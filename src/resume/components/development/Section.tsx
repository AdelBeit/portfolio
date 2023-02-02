import classNames from "classnames";
import React from "react";
import styles from "./Section.module.css";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  classes?: string | string[];
}

function Section({ title = "", children, classes = "" }: SectionProps) {
  return (
    <div className={classNames(styles.container, classes)}>
      <div className={styles.title}>{title}</div>
      <hr />
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export { Section };
