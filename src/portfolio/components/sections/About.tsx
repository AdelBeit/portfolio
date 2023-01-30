import React from "react";
import AboutCard from "../cards/About";
import EducationCard from "../cards/Education";
import TechStackCard from "../cards/TechStack";
import { ABOUT, EDUCATION, TECHSTACK } from "../../../../public/portfolio.data";

interface Props {
  width: number;
}

export default function About({ width = 379 }: Props) {
  const staticWidth = 379;
  return (
    <div className="_section" id="_about">
      <AboutCard
        title={ABOUT.TITLE}
        description={ABOUT.CONTENT}
        links={ABOUT.LINKS}
        width={width >= 1100 ? 419 : 379}
      />
      <div className="_container">
        <EducationCard
          title={EDUCATION.TITLE}
          degree={EDUCATION.DEGREE}
          width={staticWidth}
        />
        <TechStackCard icons={TECHSTACK.ICONS} width={staticWidth} />
      </div>
      <style jsx global>{`
        ._section {
          height: fit-content;
          width: 100%;

          display: flex;
          justify-content: space-around;
          gap: 20px;
          flex-wrap: wrap;
          padding: 10px;

          scroll-snap-type: y none;
          scroll-padding-top: 140px;
          scroll-margin-top: 140px;
          scroll-snap-align: center;
        }

        ._section:last-child {
          margin-bottom: 50px;
        }

        ._section ._card {
          flex: 0 0 auto;
        }
      `}</style>

      <style jsx>{`
        ._container {
          width: width;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
      `}</style>
    </div>
  );
}
