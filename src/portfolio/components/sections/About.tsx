import React from "react";
import AboutCard from "../cards/About";
import EducationCard from "../cards/Education";
import TechStackCard from "../cards/TechStack";
import { ABOUT, EDUCATION, TECHSTACK } from "../../../data/portfolio.data";

import {useWidth} from "../../store/WidthStore";

export default function About() {
  let staticWidth = 379;
  const windowWidth = useWidth().width;

  let width = staticWidth;
  if (windowWidth >= 1100) {
    width = 419;
  }
  if (windowWidth <= 480) {
    width = windowWidth - 100;
    staticWidth = width;
  }

  return (
    <div className="_section" id="_about">
      <AboutCard
        title={ABOUT.TITLE}
        description={ABOUT.CONTENT1}
        links={ABOUT.LINKS}
        width={width}
      />
      <div className="_container">
        <TechStackCard icons={TECHSTACK.ICONS} width={staticWidth} />
        <EducationCard
          title={EDUCATION.TITLE}
          degree={EDUCATION.DEGREE}
          width={staticWidth}
        />
      </div>
      <style jsx global>{`
        ._section {
          height: fit-content;
          width: 100%;

          display: flex;
          justify-content: space-around;
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
          width: ${width};
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
      `}</style>
    </div>
  );
}
