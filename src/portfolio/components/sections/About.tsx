import React from "react";
import AboutCard from "../cards/About";

export default function About() {
  return (
    <div className="_section outline">
      <AboutCard width={379} />
      <AboutCard width={379} />
      <style jsx>{`
        ._section {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: space-around;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
