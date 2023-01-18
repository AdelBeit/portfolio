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
    <div id="nav_bar" className="_container outline">
      <Baguette crumbs={buttons} shadow={true} _type="button" />
      <style jsx>{`
        ._container {
          height: fit-content;
          width: fit-content;
           {
            /* top: 0;
          bottom: 0;
          right: 0;
          left: 83vw; */
          }
           {
            /* margin: 2% 0; */
          }

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: ;
        }
        @media only screen and (max-width: 780px) {
          ._container {
            flex-direction: row;
            height: fit-content;

             {
              /* top: auto;
            bottom: 0;
            right: 0;
            left: 0; */
            }
          }
        }
      `}</style>
    </div>
  );
}
