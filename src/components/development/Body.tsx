import React from "react";
import { nanoid } from "nanoid";
import styles from "./Body.module.css";
import { useSite } from "../../hooks/use_site_context";
import { Section } from "../Section";
import { Card } from "../Card";

function Body({ children }: { children: React.ReactNode[] }) {
  return <div className={styles.container__body}>{children}</div>;
}

Body.Education = () => {
  const { education } = useSite();

  return (
    <Section title="Education">
      <Card
        header={education.school}
        subtitle={
          <>
            <div>{education.major + " - " + education.degree}</div>
            <div>{education.gradYear}</div>
          </>
        }
      />
    </Section>
  );
};

Body.Achievements = () => {
  const { achievements } = useSite();

  return (
    <Section title="Achievements">
      <Card
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
    <Section title="Skills">
      <Card
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
          <Card
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
          <Card
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
  const { info } = useSite();
  const cardContent = Object.values(info).map((e) => (
    <li key={nanoid()} className={styles.e}>
      {info[e]}
    </li>
  ));

  return (
    <Section>
      <Card content={<ul className={styles.section__info}>{cardContent}</ul>} />
    </Section>
  );
};

Body.TechStack = () => {
  const { techStack } = useSite();
  const languages = techStack.languages.map((lang) => (
    <li key={nanoid()}>{lang}</li>
  ));
  const tools = techStack.tools.map((tool) => <li key={nanoid()}>{tool}</li>);

  return (
    <>
      <Section title="Languages">
        <Card
          content={<ul className={styles.section__languages}>{languages}</ul>}
        />
      </Section>
      <Section title="Tools">
        <Card content={<ul className={styles.section__tools}>{tools}</ul>} />
      </Section>
    </>
  );
};

export { Body };
