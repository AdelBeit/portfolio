import React from "react";
import { nanoid } from "nanoid";
import styles from "./Body.module.css";
import { useSite } from "../../hooks/use_site_context";
import { Section } from "../Section";
import { Card } from "../Card";

function Body({ children }: { children: React.ReactNode[] }) {
  return <Section classes={styles.container__body}>{children}</Section>;
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

Body.Education = () => {
  const { education } = useSite();

  return (
    <Section>
      <WithCardClasses
        header={"Education"}
        subtitle={
          <ul>
            <li>{education.major + " | " + education.gradYear}</li>
            <li>{education.degree}</li>
            <li>{education.school}</li>
          </ul>
        }
      />
    </Section>
  );
};

Body.Achievements = () => {
  const { achievements } = useSite();

  return (
    <Section title="Achievements">
      <WithCardClasses
        content={achievements.map((achievement) => (
          <div key={nanoid()}>
            {achievement.title + " - " + achievement.company}
          </div>
        ))}
      />
    </Section>
  );
};

Body.Skills = () => {
  const { skills } = useSite();

  return (
    <Section>
      <WithCardClasses
        content={skills.map((skill) => (
          <div key={nanoid()}>{skill}</div>
        ))}
      />
    </Section>
  );
};

Body.Experience = () => {
  const { experience } = useSite();

  return (
    <Section title="Experience">
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
    </Section>
  );
};

Body.Projects = () => {
  const { projects } = useSite();

  return (
    <Section title="Projects">
      {projects.map((project) => {
        return (
          <WithCardClasses
            key={nanoid()}
            header={<a href={project.url}>{project.title}</a>}
            subtitle={project.language + "   |   " + project.time.year}
            content={project.description}
          />
        );
      })}
    </Section>
  );
};

Body.Info = () => {
  const { info, imgPaths } = useSite();
  const cardContent = Object.keys(info).map((e) => (
    <li key={nanoid()} className={styles[e]}>
      <div className={styles.icon}>
        <img src={imgPaths.icons[e]} />
      </div>
      <div className={styles.info}>{info[e]}</div>
    </li>
  ));

  return (
    <Section>
      <WithCardClasses
        content={<ul className={styles.section__info}>{cardContent}</ul>}
      />
    </Section>
  );
};

Body.Languages = () => {
  const { techStack } = useSite();
  const languages = techStack.languages.map((lang) => (
    <li key={nanoid()}>{lang}</li>
  ));

  return (
    <Section>
      <WithCardClasses
        header="Languages"
        content={<ul className={styles.section__languages}>{languages}</ul>}
      />
    </Section>
  );
};

Body.Tools = () => {
  const { techStack } = useSite();
  const tools = techStack.tools.map((tool) => <li key={nanoid()}>{tool}</li>);

  return (
    <Section>
      <WithCardClasses
        header="Tools"
        content={<ul className={styles.section__tools}>{tools}</ul>}
      />
    </Section>
  );
};

export { Body };
