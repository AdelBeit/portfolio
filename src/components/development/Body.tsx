import React, { ReactNode } from "react";
import { nanoid } from "nanoid";
import styles from "./Body.module.css";
import { useDev } from "../../hooks/use_site_context";
import { Section } from "../Section";
import { Card } from "../Card";

export function Body({ children }: { children: React.ReactNode[] }) {
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

export const Education = () => {
  const { education } = useDev();

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

export const Achievements = () => {
  const { achievements } = useDev();

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

export const Experience = () => {
  const { experience } = useDev();

  return (
    <Section title="Experience">
      {experience.map((exp) => {
        const duties = exp.duties.map((duty) => <li key={nanoid()}>{duty}</li>);
        let subtitle: ReactNode = exp.role || exp.time;

        if (exp.role && exp.time) {
          subtitle = exp.role + "  |  " + exp.time;
          if (exp.url.demo || exp.url.github) {
            subtitle = (
              <>
                <a href={exp.url.github || exp.url.demo}>{exp.role}</a>
                {"  |  " + exp.time}
              </>
            );
          }
        }

        let header = exp.company;

        return (
          <WithCardClasses
            key={nanoid()}
            header={header}
            subtitle={subtitle}
            content={<ul>{duties}</ul>}
          />
        );
      })}
    </Section>
  );
};

export const Projects = () => {
  const { projects } = useDev();

  return (
    <Section title="Products">
      {projects.map((project) => {
        const header = (
          <>
            <a href={project.url.demo}>{project.title}</a>
            {"  |  "}
            {project.url.github && <a href={project.url.github}>Code</a>}
            {/* {"  |  " + project.time.year} */}
          </>
        );
        return (
          <WithCardClasses
            key={nanoid()}
            header={header}
            subtitle={""}
            content={project.description}
          />
        );
      })}
    </Section>
  );
};

export const Info = () => {
  const { info, imgPaths, urls } = useDev();
  const cardContent = Object.keys(info).map((i) => (
    <li key={nanoid()} className={styles[i]}>
      <div className={styles.icon}>
        <img src={imgPaths.icons[i]} />
      </div>
      <div className={styles.info}>
        {urls[i] ? <a href={urls[i]}>{info[i]}</a> : info[i]}
      </div>
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

export const Languages = () => {
  const { techStack } = useDev();
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

export const Tools = () => {
  const { techStack } = useDev();
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
