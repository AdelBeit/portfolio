import React, { useState } from "react";
import { ABOUT } from "../../../public/portfolio.data";
import { linkHandler } from "../utils/linkHandler";
import Baguette from "./Baguette";

interface Props {
  showLanding: boolean;
}

// TODO: make the navbar 'dormant' further to the right of the screen, when hovered over, move icons to the left and expand gap between them

export default function NavBaguette({ showLanding }: Props) {
  const [playMusic, setPlayMusic] = useState(false);

  function musicToggle() {
    const musicElement = document.querySelector("#music") as SVGSymbolElement;
    const animationElements = musicElement.querySelectorAll(
      ".p0"
    ) as NodeListOf<SVGAnimateElement>;
    for (let element of Array.from(animationElements)) {
      if (playMusic) element.beginElementAt(0);
      else element.endElementAt(0);
    }

    setPlayMusic((prev) => !prev);
  }

  function scrollTo(eID: string, { yOffset = -20 } = {}) {
    return () => {
      const element = document.querySelector(`#${eID}`);
      const viewBox = document.querySelector("#_viewbox");
      const top =
        element.getBoundingClientRect().top + viewBox.scrollTop + yOffset;
      viewBox.scrollTo({ top: top, behavior: "smooth" });
    };
  }

  let buttons = new Map([
    ["music", { clickHandler: musicToggle }],
    ["info", { clickHandler: scrollTo("_about"), classes: "active" }],
    ["products", { clickHandler: scrollTo("_product") }],
    ["blogpost", { clickHandler: scrollTo("_blogpost") }],
    ["experience", { clickHandler: scrollTo("_experience") }],
    ["arrowup", { clickHandler: scrollTo("_landing") }],
  ]);

  if (showLanding) {
    const links = { ...ABOUT.LINKS };
    buttons = new Map([
      ["music", { clickHandler: musicToggle }],
      ["github", { clickHandler: linkHandler(links.GITHUB) }],
      ["linkedin", { clickHandler: linkHandler(links.LINKEDIN) }],
      ["email", { clickHandler: linkHandler(links.EMAIL) }],
      ["resume", { clickHandler: linkHandler(links.RESUME) }],
      ["arrowdown", { clickHandler: scrollTo("_about") }],
    ]);
  }

  return (
    <div id="_navbar" className="_container z-index-10">
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
            position: absolute;
            bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}
