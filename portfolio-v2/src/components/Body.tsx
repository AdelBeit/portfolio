import React from "react";
import { useSite } from "../hooks/use_site_context";
import styles from "./Body.module.css";
import { Section } from "./Section";
import { Card } from "./Card";

function Body() {
  const { experience, education, achievements, skills } = useSite();

  return (
    <div className={styles.container__body}>
      <Section title="Experience">
        {experience.map((exp) => {
          const duties = exp.duties.map((duty) => <li>{duty}</li>);
          return (
            <Card
              header={exp.company}
              subtitle={exp.role + " | " + exp.time}
              content={<ul>{duties}</ul>}
            />
          );
        })}
      </Section>
      <Section title="Education">
        <Card
          header={education.school}
          subtitle={[
            <div>{education.major + " - " + education.degree}</div>,
            <div>{education.gradYear}</div>,
          ]}
        />
      </Section>
      <Section title="Achievements">
        <Card
          content={achievements.map((achievement) => (
            <div>{achievement.title + " - " + achievement.company}</div>
          ))}
        />
      </Section>
      <Section title="Skills">
        <Card
          content={skills.map((skill) => (
            <div>{skill}</div>
          ))}
        />
      </Section>
    </div>
  );
}

export { Body };
