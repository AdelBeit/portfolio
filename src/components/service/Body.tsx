import React from "react";
import { nanoid } from "nanoid";
import styles from "./Body.module.css";
import { useService } from "../../hooks/use_site_context";
import { Section } from "../Section";
import { Card } from "../Card";

export function Body({ children }: { children: React.ReactNode[] }) {
  return <div className={styles.container__body}>{children}</div>;
}

function WithCardClasses(props) {
  return (
    <Card
      classes={{
        header: styles.card__header,
        subtitle: styles.card__subtitle,
        content: styles.card__content,
      }}
      {...props}
    />
  );
}

function WithSectionClasses(props) {
  return <Section {...props}>{props.children}</Section>;
}

export const Education = () => {
  const { education } = useService();

  return (
    <WithSectionClasses classes={[styles.section__education]} title="Education">
      <WithCardClasses
        header={education.school}
        subtitle={
          <>
            <div>{education.major + " - " + education.degree}</div>
            <div>{education.gradYear}</div>
          </>
        }
      />
    </WithSectionClasses>
  );
};

export const Achievements = () => {
  const { achievements } = useService();

  return (
    <WithSectionClasses
      classes={[styles.section__achievements]}
      title="Achievements"
    >
      <WithCardClasses
        content={achievements.map((achievement) => (
          <div key={nanoid()}>
            {achievement.title + " - " + achievement.company}
          </div>
        ))}
      />
    </WithSectionClasses>
  );
};

export const Skills = () => {
  const { skills } = useService();

  return (
    <WithSectionClasses classes={[styles.section__skills]} title="Skills">
      <WithCardClasses
        content={skills.map((skill) => (
          <div key={nanoid()}>{skill}</div>
        ))}
      />
    </WithSectionClasses>
  );
};

export const Experience = () => {
  const { experience } = useService();

  return (
    <WithSectionClasses
      classes={[styles.section__experience]}
      title="Experience"
    >
      {experience.map((exp) => {
        const duties = exp.duties.map((duty) => <li key={nanoid()}>{duty}</li>);
        return (
          <WithCardClasses
            key={nanoid()}
            header={exp.company}
            subtitle={exp.role + "   |   " + exp.time}
            content={<ul>{duties}</ul>}
          />
        );
      })}
    </WithSectionClasses>
  );
};
