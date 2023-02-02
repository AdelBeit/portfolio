import React from "react";
import styles from "./Card.module.css";
import classNames from "classnames";
import { nanoid } from "nanoid";

interface CardProps {
  header?: React.ReactNode | React.ReactNode[];
  subtitle?: React.ReactNode | React.ReactNode[];
  content?: React.ReactNode | React.ReactNode[];
  classes?: { [key: string]: string | string[] };
}

function Card({
  header = null,
  subtitle = null,
  content = null,
  classes = { header: [], subtitle: [], content: [] },
}: CardProps) {
  return (
    <div className={styles.container__card}>
      {header ? (
        <div className={classNames(styles.card__header, classes["header"])}>
          {header}
        </div>
      ) : null}
      {subtitle ? (
        <div className={classNames(styles.card__subtitle, classes["subtitle"])}>
          {subtitle}
        </div>
      ) : null}
      {content ? (
        <div className={classNames(styles.card__content, classes["content"])}>
          {Array.isArray(content) ? (
            <ul>
              {content.map((c) => (
                <li key={nanoid()}>{c}</li>
              ))}
            </ul>
          ) : (
            content
          )}
        </div>
      ) : null}
    </div>
  );
}

export { Card };
