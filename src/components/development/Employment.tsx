import { nanoid } from "nanoid";
import React from "react";
import { useDev } from "../../hooks/use_site_context";
import { Section } from "./Section";
import { TripleHeaderCard } from "./TripleHeaderCard";
import styles from "./Employment.module.css";

function Employment() {
  const { experience } = useDev();
  return (
    <Section title="Employment">
      {experience.map((exp) => {
        return (
          <TripleHeaderCard
            key={nanoid()}
            headers={[exp.role, exp.company, exp.time]}
            content={exp.duties}
            classes={{
              header: [styles.header],
              subtitle: [],
              content: [],
            }}
          />
        );
      })}
    </Section>
  );
}

export { Employment };
