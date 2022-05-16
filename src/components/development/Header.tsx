import React from "react";
import { useSite } from "../../hooks/use_site_context";
import styles from "./Header.module.css";

function Header() {
  const { role, site, description } = useSite();
  const name = { first: "", last: "" };
  [name.first, name.last] = useSite().name.split(" ");

  return (
    <div className={styles.container__header}>
      <div className={styles.section__name}>
        <div>{name.first}</div>
        <div>{name.last}</div>
      </div>
      <div className={styles.section__info}>
        <span className={styles.info}>{role + "   |   " + site}</span>
      </div>
      <div className={styles.section__description}>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
}

export { Header };
