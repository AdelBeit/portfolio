import React from "react";
import { useWidth } from "../../store/WidthStore";

import ExperienceCard from "../cards/Experience";

export default function Experience() {
  let width = 379;
  const windowWidth = useWidth().width;
  const EXPERIENCE = [];
  if (windowWidth <= 480) {
    width = windowWidth - 100;
  }

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
