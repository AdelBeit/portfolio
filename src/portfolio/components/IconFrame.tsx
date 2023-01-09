import React, { useState } from "react";

interface FrameProps {
  _type: "button" | "icon";
  icon: string;
  shadow?: boolean;
  border?: boolean;
  borderSize?: number;
  frameSize?: number;
  height?: number;
  iconSize?: string;
  clickHandler?: () => void;
}

interface IconProps {
  icon: FrameProps["icon"];
  color: "black" | "green" | "amber";
  size?: string;
}

export function Icon({ icon, color = "green", size = "60%" }: IconProps) {
  return (
    <div className="_container relative">
      <svg className="_svg absolute" xmlns="https://www.w3.org/2000/svg">
        <use
          href={`./svg stores/icons.svg#${icon}`}
          xlinkHref={`./svg stores/icons.svg#${icon}`}
          x="0"
          y="0"
        ></use>
      </svg>
      <style jsx>{`
        ._container {
          width: ${size};
          height: ${size};
          fill: inherit;
        }

        ._svg {
          width: 100%;
          height: 100%;
          fill: var(--${color});
          fill: inherit;
        }
      `}</style>
    </div>
  );
}

export default function Frame({
  _type = "icon",
  icon = "github",
  shadow = false,
  border = true,
  borderSize = 4,
  frameSize = 60,
  iconSize = "60%",
  clickHandler = () => {},
}: FrameProps) {
  const [color, setColor] = useState<IconProps["color"]>(
    _type === "button" ? "amber" : "green"
  );

  if (_type === "icon") {
    shadow = false;
  }

  if (_type === "button") {
    border = true;
  }

  return (
    <div className="_container relative" onClick={clickHandler}>
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

        ._container:hover {
          ${_type === "button" && "--hovered: ; fill: var(--black);"}
        }

        ._frame {
          width: ${frameSize}px;
          height: ${frameSize}px;
          --bg: var(--hovered) var(--${color});
          background-color: var(--bg, var(--black));
          border: solid ${border ? borderSize : 0}px var(--${color});
        }

        ._frame.overlay {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        ._frame.underlay {
          --bg: var(--hovered) var(--black);
          background-color: var(--bg, var(--${color}));
          top: 4px;
          left: 4px;
          border: solid 1px var(--${color});
        }
      `}</style>
    </div>
  );
}
