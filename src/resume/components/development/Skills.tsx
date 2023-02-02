import React from "react";
import { useDev } from "../../hooks/use_site_context";
import { Card } from "../Card";
import { Section } from "./Section";
import styles from "./Card.module.css";

function Skills() {
  const {
    techStack: { languages, tools },
  } = useDev();
  const content = [`${languages.join("; ")};`, `${tools.join("; ")};`];
  return (
    <Section title="Languages and Technologies">
      <Card
        content={content}
        classes={{
          header: [],
          subtitle: [styles.subtitle],
          content: [styles.body],
        }}
      />
    </Section>
  );
}

export { Skills };
