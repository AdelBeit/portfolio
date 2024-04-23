import React, {useEffect} from "react";
import {ArrowDown} from "../../static/svgs/ArrowDown";
import {ArrowUp} from "../../static/svgs/ArrowUp";
import {MusicVis} from "../../static/svgs/MusicVis";

interface Props {
  icon: string;
  size?: string;
}

export default function Icon({icon, size = "60%"}: Props) {
  const animatedIcons = {
    arrow_up: <ArrowUp />,
    arrow_down: <ArrowDown />,
    music_vis: <MusicVis />,
  };
  const isAnimated = icon.toLowerCase() in Object.keys(animatedIcons);
  let path = "./svg stores/icons.svg#" + icon.toLowerCase();
  path = isAnimated ? "./#_inline_" : path;
  let svg = (
    <svg className="_svg absolute" xmlns="https://www.w3.org/2000/svg">
      <use href={path} xlinkHref={path} x="0" y="0"></use>
    </svg>
  );
  if (icon.toLowerCase() in animatedIcons) svg = animatedIcons[icon];
  return (
    <div className={`_container _icon ${icon.toLowerCase()} relative`}>
      {svg}
      <style jsx>{`
        ._container {
          width: ${size};
          height: ${size};
        }

        .arrow_up,
        .arrow_down {
          width: 40px;
          height: 40px;
        }
        .music_vis {
          width: 60px;
          height: 60px;
          top: 30px;
        }
      `}</style>
    </div>
  );
}

/**
 * svg management
 * # interactive:
 * - - nav bar icons
 * - - about card actions icons
 * - - product card actions
 * # # <symbol> + <use> <-- iconstore
 * # static:
 * - - product card techs
 * - - tech stack grid
 * # # <symbol> + <use> <-- iconstore
 * - - icon ether
 * # # <img> <-- simpleicons
 * # animated:
 * - nav bar icons:
 * - - music_vis
 * - - arrow_down/up
 * - product card
 * # <object> <-- svg file
 */
