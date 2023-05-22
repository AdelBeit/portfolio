import React from "react";

interface Props {
  icon: string;
  size?: string;
}

export default function Icon({ icon, size = "60%" }: Props) {
  const animatedIcons = ["arrowup", "arrowdown", "music_vis"];
  const isAnimated = animatedIcons.some((e) => icon.toLowerCase().includes(e));
  const path = (isAnimated ? "./#_inline_" : "./svg stores/icons.svg#") + icon.toLowerCase();
  return (
    <div className={`_container _icon ${icon.toLowerCase()} relative`}>
      <svg className="_svg absolute" xmlns="https://www.w3.org/2000/svg">
        <use href={path} xlinkHref={path} x="0" y="0"></use>
      </svg>
      <style jsx>{`
        ._container {
          width: ${size};
          height: ${size};
        }

        .arrowup,
        .arrowdown {
          width: 40px;
          height: 40px;
        }
        .music_vis {
          width: 60px;
          height: 60px;
          top: 10px;
        }
        @media only screen and (max-width: 600px) {
          .music_vis {
            top: 8px;
          }
        }
        @media only screen and (max-width: 480px) {
          .music_vis {
            top: 6px;
          }
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
 * - - arrowdown/up
 * - product card
 * # <object> <-- svg file
 */
