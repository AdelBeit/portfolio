import React from "react";
import styles from "./Card.module.css";

function Card({
  header = null,
  subtitle = null,
  content = null,
}: {
  [key: string]: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className={styles.container__card}>
      {header ? <div className={styles.card__header}>{header}</div> : null}
      {subtitle ? (
        <div className={styles.card__subtitle}>{subtitle}</div>
      ) : null}
      {content ? <div className={styles.card__content}>{content}</div> : null}
    </div>
  );
}

export { Card };
