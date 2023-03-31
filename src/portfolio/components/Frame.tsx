import cs from "classnames";
import React from "react";
import { ICON_MAPPINGS } from "../../../public/svgs/icons/mapping";
import Icon from "./Icon";

interface BaseFrameProps {
  icon: string;
  frameSize?: number;
}

export interface IconFrameProps extends BaseFrameProps {
  _type: "icon";
  border?: boolean;
  borderSize?: number;
}

function IconFrame({
  icon,
  frameSize = 30,
  border = true,
  borderSize = 2,
}: IconFrameProps) {
  const iconSize = "66%";

  return (
    <div className="_container relative">
      <div className="_frame overlay absolute">
        <Icon {...{ icon, size: iconSize }} />
      </div>

      <style jsx>{`
        ._container {
          width: 100%;
          height: 100%;
          width: ${frameSize}px;
          height: ${frameSize}px;

          fill: var(--green);
        }

        ._container:hover::after {
          content: "${ICON_MAPPINGS[icon]}";
          width: fit-content;
          position: absolute;
          font-size: 12px;
          top: 50%;
          left: 0;
          padding: 5px;
          background-color: var(--black);
          border: 1px solid var(--green);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        ._frame {
          width: ${frameSize}px;
          height: ${frameSize}px;
          background-color: var(--black);
          border: solid ${border ? borderSize : 0}px var(--green);
        }

        @media only screen and (max-width: 480px) {
          ._frame {
            border-width: ${borderSize === 0 ? borderSize : 1}px;
          }
        }
      `}</style>
      <style jsx>{`
        ${staticStyles["_frame.overlay"]}
      `}</style>
    </div>
  );
}

export interface ButtonFrameProps extends BaseFrameProps {
  _type: "button";
  shadow?: boolean;
  clickHandler: (e: any) => void;
  classes?: string | string[];
}

function ButtonFrame({
  _type = "button",
  icon,
  frameSize = 60,
  shadow = false,
  clickHandler,
  classes = "",
}: ButtonFrameProps) {
  const color = "amber";
  const iconSize = "60%";

  return (
    <div
      className={cs(`_container _button ${icon} relative`, classes)}
      onClick={(e) => {
        clickHandler.call(null, e);
      }}
    >
      {!!shadow && <div className={"_frame underlay absolute"}></div>}

      <div className="_frame overlay absolute">
        <Icon {...{ icon, color, size: iconSize }} />
      </div>

      <style jsx>{`
        ._container {
          width: 100%;
          height: 100%;
          width: ${shadow ? frameSize + 5 : frameSize}px;
          height: ${shadow ? frameSize + 5 : frameSize}px;

          // initialize vars to false
          --hovered: initial;
          fill: var(--${color});
          cursor: pointer;
        }

        ._container:hover,
        ._container._button.active {
          --hovered: ;
          fill: var(--black);
        }

        ._frame {
          width: ${frameSize}px;
          height: ${frameSize}px;
          --bg: var(--hovered) var(--${color});
          background-color: var(--bg, var(--black));
          border: solid 4px var(--${color});
        }

        ._frame.underlay {
          --bg: var(--hovered) var(--black);
          background-color: var(--bg, var(--${color}));
          top: 4px;
          left: 4px;
          border: solid 1px var(--${color});
        }

        @media only screen and (max-width: 480px) {
          ._frame {
            border-width: 2px;
          }
        }
      `}</style>
      <style jsx>{`
        ._container.products,
        ._container.arrowup,
        ._container.arrowdown,
        ._container.music_vis,
        ._container.music,
        ._container.resume {
          --stroke: var(--hovered) var(--black);
          stroke: var(--stroke, var(--${color}));
          color: var(--stroke, var(--${color}));
        }
      `}</style>
      <style jsx>{`
        ${staticStyles["_frame.overlay"]}
      `}</style>
    </div>
  );
}

export type ButtonOrIcon = ButtonFrameProps | IconFrameProps;

export default function Frame(props: ButtonOrIcon) {
  const element =
    props["_type"] === "icon" ? (
      <IconFrame {...props} />
    ) : props["_type"] === "button" ? (
      <ButtonFrame {...props} />
    ) : (
      <></>
    );

  return element;
}

const staticStyles = {
  "_frame.overlay": `._frame.overlay {display: flex;
  justify-content: center;
  align-items: center;}`,
};
