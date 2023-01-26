import React from "react";
import { EXPERIENCE } from "../../../../public/portfolio.data";
import ExperienceCard from "../cards/Experience";

export default function Experience() {
  let width = 379;

  return (
    <div className="_section" id="_experience">
      {EXPERIENCE.map((e) => (
        <ExperienceCard
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
