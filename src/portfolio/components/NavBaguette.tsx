import React from "react";
import Baguette from "./Baguette";

export default function NavBaguette() {
  const techStack = [
    "github",
    "node",
    "js",
    "react",
    "typescript",
    "git",
    "docker",
    "node",
  ];
  return (
    <div id="nav_bar" className="_container fixed outline">
      <Baguette crumbs={techStack} _type="icon" />
      <style jsx>{`
        ._container {
          height: 98vh;
          width: fit-content;
          top: 0;
          bottom: 0;
          right: 0;
          left: auto;
          margin: 10px auto;

          display: flex;
          flex-direction: column;
          padding: 0;
          gap: 6px;
        }
        @media only screen and (max-width: 780px) {
          ._container {
            flex-direction: row;
            height: fit-content;

            top: auto;
            bottom: 0;
            right: 0;
            left: 0;
          }
        }
      `}</style>
    </div>
  );
}
