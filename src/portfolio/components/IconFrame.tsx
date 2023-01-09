import React, { useState } from "react";

interface FrameProps {
  _type: "button" | "icon";
  icon: string;
  shadow?: boolean;
  border?: boolean;
  width?: number;
  height?: number;
  clickHandler?: () => void;
}

interface IconProps {
  icon: FrameProps["icon"];
  color: "black" | "green" | "amber";
  size?: string;
}

// export function Icon({
//   icon,
//   border,
//   shadow,
//   interactive,
//   onClick,
// }: ) {
//   return (
//     <div className="_container">
//       <svg className="_svg absolute" xmlns="https://www.w3.org/2000/svg">
//         <use
//           href={`./svg stores/icons.svg#${icon}`}
//           xlinkHref={`./svg stores/icons.svg#${icon}`}
//           x="0"
//           y="0"
//         ></use>
//       </svg>
//       <style jsx>{`
//         ._container {
//         }

//         ._svg {
//         }
//       `}</style>
//     </div>
//   );
// }

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
  width = (clickHandler = () => {}),
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
        <Icon {...{ icon, color }} />
      </div>

      <style jsx>{`
        ._container {
          width: 100%;
          height: 100%;
          width: ${shadow ? 65 : 60}px;
          height: ${shadow ? 65 : 60}px;

          // initialize vars to false
          --hovered: initial;
          fill: var(--${color});
        }

        ._container:hover {
          --hovered: ;
          fill: var(--black);
        }

        ._frame {
          width: 60px;
          height: 60px;
          --bg: var(--hovered) var(--${color});
          background-color: var(--bg, var(--black));
          border: solid ${border ? 4 : 0}px var(--${color});
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
