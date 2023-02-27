import React from "react";
import { useDev } from "../../hooks/use_site_context";
import { Section } from "./Section";
import { TripleHeaderCard } from "./TripleHeaderCard";
import styles from "./Education.module.css";

function Education() {
  const { education } = useDev();
  const year = education.year.start + " - " + education.year.end;
  const courses = `Undergraduate Coursework: ${education.courses.join("; ")};`;
  return (
    <Section title="Education">
      <TripleHeaderCard
        headers={[education.city, education.school, ""]}
        content={[education.degree]}
        classes={{
          header: [styles.header],
          subtitle: [],
          content: [],
        }}
      />
    </Section>
  );
}

export { Education };
