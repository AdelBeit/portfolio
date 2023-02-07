import React from "react";
import AboutCard from "../cards/About";
import EducationCard from "../cards/Education";
import TechStackCard from "../cards/TechStack";
import { ABOUT, EDUCATION, TECHSTACK } from "../../../../public/portfolio.data";
import { BaseSectionProps } from "../../types";
import { useWidth } from "../../store/WidthStore";

interface Props extends BaseSectionProps {}

export default function About(props: Props) {
  let staticWidth = 379;
  const windowWidth = useWidth((state) => state.width);

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
          width: ${width};
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
      `}</style>
    </div>
  );
}
