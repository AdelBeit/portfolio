import cs from "classnames";
import React from "react";
import {ABOUT} from "../../data/portfolio.data";
import {useSectionObserver} from "../hooks/useSectionObserver";
import {useMusic} from "../store/MusicStore";
import {useWidth} from "../store/WidthStore";
import {Button as ButtonFrame} from "./frames/Button";

interface Props {
  showLanding: boolean;
}

// TODO: make the navbar 'dormant' further to the right of the screen, when hovered over, move icons to the left and expand gap between them

export default function NavBaguette({showLanding}: Props) {
  const {activeSection} = useSectionObserver();
  const player = useMusic((state) => ({
    playing: state.playing,
    toggle: state.toggle,
  }));
  const musicIcon = player.playing ? "music_vis" : "music_icon";
  const windowWidth = useWidth().width;
  let frameSize = 60;
  frameSize =
    windowWidth <= 340
      ? frameSize - 25
      : windowWidth <= 380
      ? frameSize - 20
      : windowWidth <= 600
      ? frameSize - 10
      : frameSize;

  function scrollTo(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    eID: string,
    {yOffset = -20} = {}
  ) {
    e.preventDefault();
    const element = document.querySelector(`#${eID}`);
    const viewBox = document.querySelector("#_viewbox");
    const top =
      element.getBoundingClientRect().top + viewBox.scrollTop + yOffset;
    viewBox.scrollTo({top: top, behavior: "smooth"});
  }

  let buttons = (
    <>
      <a href="#" onClick={player.toggle}>
        <ButtonFrame shadow={true} icon={musicIcon} />
      </a>
      <a href="#_products" onClick={(e) => scrollTo(e, "_products")}>
        <ButtonFrame
          shadow={true}
          icon={"products"}
          classes={cs("_products", activeSection === "_products" && "active")}
        />
      </a>
      <a href="#_about" onClick={(e) => scrollTo(e, "_about")}>
        <ButtonFrame
          shadow={true}
          icon={"person"}
          classes={cs("_about", activeSection === "_about" && "active")}
        />
      </a>
      <a href="#_landing" onClick={(e) => scrollTo(e, "_landing")}>
        <ButtonFrame shadow={true} icon="arrowup" />
      </a>
    </>
  );

  if (showLanding) {
    const links = {...ABOUT.LINKS};
    buttons = (
      <>
        <a href="#" onClick={player.toggle}>
          <ButtonFrame shadow={true} icon={musicIcon} />
        </a>
        {["github", "linkedin", "email", "resume"].map((icon, _i) => (
          <a href={links[icon.toUpperCase()]} key={_i} target="_blank">
            <ButtonFrame shadow={true} icon={icon} />
          </a>
        ))}
        <a href="#_products" onClick={(e) => scrollTo(e, "_products")}>
          <ButtonFrame shadow={true} icon="arrowdown" />
        </a>
      </>
    );
  }

  return (
    <div id="_navbar" className="_container z-index-10">
      {buttons}
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
