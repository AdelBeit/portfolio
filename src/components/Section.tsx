import classNames from "classnames";
import React from "react";
import styles from "./Section.module.css";

function Section({
  title = "",
  children,
  classes = "",
}: {
  title?: string;
  children: React.ReactNode;
  classes?: string | string[];
}) {
  title;
  return (
    <div className={classNames(styles["container__section"], classes)}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </div>
  );
}

export { Section };
