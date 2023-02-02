import classNames from "classnames";
import React from "react";
import styles from "./Section.module.css";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  classes?: string | string[];
}

function Section({ title = "", children, classes = "" }: SectionProps) {
  title;
  return (
    <div className={classNames(styles.container, classes)}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </div>
  );
}

export { Section };
