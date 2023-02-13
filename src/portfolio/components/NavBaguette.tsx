import React from "react";
import { ABOUT } from "../../../public/portfolio.data";
import { useMusic } from "../store/MusicStore";
import { useWidth } from "../store/WidthStore";
import { linkHandler } from "../utils/linkHandler";
import Baguette from "./Baguette";

interface Props {
  showLanding: boolean;
}

// TODO: make the navbar 'dormant' further to the right of the screen, when hovered over, move icons to the left and expand gap between them

export default function NavBaguette({ showLanding }: Props) {
  const player = useMusic((state) => ({
    playing: state.playing,
    toggle: state.toggle,
  }));
  const musicIcon = player.playing ? "music_vis" : "music_icon";
  const windowWidth = useWidth((state) => state.width);
  let frameSize = 60;
  frameSize =
    windowWidth <= 340
      ? frameSize - 25
      : windowWidth <= 380
      ? frameSize - 20
      : windowWidth <= 600
      ? frameSize - 10
      : frameSize;

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
    ["music", { icon: musicIcon, clickHandler: player.toggle }],
    [
      "products",
      {
        icon: "code",
        clickHandler: scrollTo("_products"),
        classes: "_products",
      },
    ],
    [
      "info",
      {
        icon: "person",
        clickHandler: scrollTo("_about"),
        classes: "active _about",
      },
    ],
    // ["blogpost", { icon: 'blogpost',clickHandler: scrollTo("_blogpost"), classes: "_blogpost" }],
    [
      "experience",
      {
        icon: "experience",
        clickHandler: scrollTo("_experience"),
        classes: "_experience",
      },
    ],
    ["arrowup", { icon: "arrowup", clickHandler: scrollTo("_landing") }],
  ]);

  if (showLanding) {
    const links = { ...ABOUT.LINKS };
    buttons = new Map([
      ["music", { icon: musicIcon, clickHandler: player.toggle }],
      ["github", { icon: "github", clickHandler: linkHandler(links.GITHUB) }],
      [
        "linkedin",
        { icon: "linkedin", clickHandler: linkHandler(links.LINKEDIN) },
      ],
      ["email", { icon: "email", clickHandler: linkHandler(links.EMAIL) }],
      ["resume", { icon: "resume", clickHandler: linkHandler(links.RESUME) }],
      ["arrowdown", { icon: "arrowdown", clickHandler: scrollTo("_products") }],
    ]);
  }

  return (
    <div id="_navbar" className="_container z-index-10">
      <Baguette
        crumbs={buttons}
        shadow={true}
        _type="button"
        {...{ frameSize }}
      />
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
            width: 85%;
            margin: 10px 0;
            position: absolute;
            bottom: 0;
          }
        }
        @media only screen and (max-width: 600px) {
          ._container {
            width: 90%;
          }
        }
        @media only screen and (max-width: 400px) {
          ._container {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
