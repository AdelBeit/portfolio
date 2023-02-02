import React from "react";
import { useService } from "../../hooks/use_site_context";
import styles from "./Header.module.css";

function Header() {
  const { name, role, site, description, phone, city } = useService();
  return (
    <div className={styles.container__header}>
      <span className={styles.name}>{name}</span>
      <div className={styles.section__info}>
        <span className={styles.info}>{`${phone}     |     ${city}`}</span>
      </div>
      <div className={styles.section__description}>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
}

export { Header };
