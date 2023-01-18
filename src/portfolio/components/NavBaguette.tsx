import React, { useState } from "react";
import { ABOUTLINKS } from "../../../public/data";
import { linkHandler } from "../utils/linkHandler";
import Baguette from "./Baguette";

interface NavProps {
  showLanding: boolean;
}

export default function NavBaguette({ showLanding }: NavProps) {
  const [playMusic, setPlayMusic] = useState(true);
  function musicToggle() {
    setPlayMusic((prev) => !prev);
  }

  function scrollTo(eID: string) {
    return () => {
      const element = document.querySelector(`#${eID}`);
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    };
  }

  let buttons = new Map([
    ["music", { clickHandler: musicToggle }],
    ["about", { clickHandler: scrollTo("_about") }],
    ["products", { clickHandler: scrollTo("_products") }],
    ["blog", { clickHandler: scrollTo("_blog") }],
    ["experience", { clickHandler: scrollTo("_experience") }],
    ["scrollUp", { clickHandler: scrollTo("_landing") }],
  ]);

  if (showLanding)
    buttons = new Map([
      ["music", { clickHandler: musicToggle }],
      ["github", { clickHandler: linkHandler(ABOUTLINKS["github"]) }],
      ["linkedin", { clickHandler: linkHandler(ABOUTLINKS["linkedin"]) }],
      ["email", { clickHandler: linkHandler(ABOUTLINKS["email"]) }],
      ["resume", { clickHandler: linkHandler(ABOUTLINKS["resume"]) }],
      ["scrollDown", { clickHandler: scrollTo("_about") }],
    ]);

  return (
    <div id="_navbar" className="_container">
      <Baguette crumbs={buttons} shadow={true} _type="button" />
      <style jsx>{`
        ._container {
          height: 80%;
          margin-top: 30px;
          flex-basis: 13%;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
        }
        @media only screen and (max-width: 780px) {
          ._container {
            flex-direction: row;
            height: fit-content;
            width: 80%;
            margin: 10px 0;
          }
        }
      `}</style>
    </div>
  );
}
