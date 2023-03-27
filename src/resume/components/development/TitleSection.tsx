import React from "react";
import { useDev } from "../../hooks/use_site_context";
import styles from "./TitleSection.module.css";

function TitleSection() {
  const { name, city, portfolio, email, phone, github } = useDev();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h4 className={styles.city}>{city}</h4>
        <h4 className={styles.site}>
          <a href={"https://" + portfolio}>{portfolio}</a>
        </h4>
      </div>
      <div className={styles.center}>
        <h1>{name}</h1>
      </div>
      <div className={styles.right}>
        <h4 className={styles.phone}>{phone}</h4>
        <h4 className={styles.github}>
          <a href={"https://" + github}>{github}</a>
        </h4>
      </div>
    </div>
  );
}

export { TitleSection };
