import React from "react";
import ExperienceCard from "../cards/Experience";

export default function Experience() {
  let width = 379;

  return (
    <div className="_section" id="_experience">
      <ExperienceCard width={width} />
      <ExperienceCard width={width} />
    </div>
  );
}
