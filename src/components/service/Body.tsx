import React from "react";
import { nanoid } from "nanoid";
import styles from "./Body.module.css";
import { useSite } from "../../hooks/use_site_context";
import { Section } from "../Section";
import { Card } from "../Card";
import classNames from "classnames";

function Body({ children }: { children: React.ReactNode[] }) {
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

Body.Education = () => {
  const { education } = useSite();

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

Body.Education.displayName = "Education";

Body.Achievements = () => {
  const { achievements } = useSite();

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

Body.Skills = () => {
  const { skills } = useSite();

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

Body.Experience = () => {
  const { experience } = useSite();

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

export { Body };
