import React, { useEffect, useState } from "react";

interface FrameProps {
  _type: "button" | "icon";
  icon: string;
  shadow?: boolean;
  border?: boolean;
  clickHandler?: () => void;
}

interface IconProps {
  icon: FrameProps["icon"];
  color: "black" | "green" | "amber";
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

function Icon({ icon, color = "green" }: IconProps) {
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
          width: 60%;
          height: 60%;
          fill: inherit;
        }

        ._svg {
          width: 100%;
          height: 100%;
          fill: var(--${color});
          fill: inherit;
          pointer-events: none;
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
  clickHandler = () => {},
}: FrameProps) {
  const [color, setColor] = useState<IconProps["color"]>(
    _type === "button" ? "amber" : "green"
  );

  const [hover, setHover] = useState(false);

  const hoverHandler = (e) => {
    setHover(true);
  };

  useEffect(() => {
    // setColor()
  }, [hover]);

  if (_type === "icon") {
    shadow = false;
  }

  if (_type === "button") {
    border = true;
  }

  return (
    <div className="_container relative" onClick={clickHandler}>
      <div className={"_frame underlay absolute " + (!shadow && "hide")}></div>
      <div className="_frame overlay absolute">
        <Icon {...{ icon, color }} />
      </div>

      <style jsx>{`
        ._container {
          width: 100%;
          height: 100%;
          width: ${shadow ? 60 : 65}px;
          height: ${shadow ? 60 : 65}px;

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

// export function Button({ shadow, onClick }: ButtonProps) {
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
