import React from "react";
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

        ._frame {
          width: ${frameSize}px;
          height: ${frameSize}px;
          background-color: var(--black);
          border: solid ${border ? borderSize : 0}px var(--green);
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
}

function ButtonFrame({
  _type = "button",
  icon,
  frameSize = 60,
  shadow = false,
  clickHandler,
}: ButtonFrameProps) {
  const color = "amber";
  const iconSize = "60%";

  return (
    <div
      className={`_container _button ${icon} relative ${
        icon === "info" ? "active" : ""
      }`}
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
      `}</style>
      <style jsx>{`
        ._container.products,
        ._container.arrowup,
        ._container.arrowdown,
        ._container.music {
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
