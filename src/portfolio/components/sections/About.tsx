import React from "react";
import AboutCard from "../cards/About";
import EducationCard from "../cards/Education";
import TechStackCard from "../cards/TechStack";

export default function About() {
  return (
    <div className="_section">
      {/* <EducationCard width={352} /> */}
      <TechStackCard width={348} />
      {/* <AboutCard width={379} /> */}
      <style jsx>{`
        ._section {
          height: 100%;
          height: fit-content;
          width: 100%;
          display: flex;
          justify-content: space-around;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
