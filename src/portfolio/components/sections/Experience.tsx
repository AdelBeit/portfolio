import React from "react";
import { EXPERIENCE } from "../../../../public/portfolio.data";
import { BaseSectionProps } from "../../types";
import ExperienceCard from "../cards/Experience";

interface Props extends BaseSectionProps {}

export default function Experience({}: Props) {
  let width = 379;

  return (
    <div className="_section" id="_experience">
      {EXPERIENCE.map((e, _index) => (
        <ExperienceCard
          key={_index}
          companyName={e.TITLE}
          duties={e.CONTENT}
          role={e.ROLE}
          date={e.DATE}
          width={width}
        />
      ))}
    </div>
  );
}
