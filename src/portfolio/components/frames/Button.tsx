import cs from "classnames";
import React from "react";
import {useActiveSection} from "../../store/ActiveSectionStore";
import {BaseFrameProps} from "../../types";
import Icon from "../Icon";

interface Props extends BaseFrameProps {
  shadow?: boolean;
  clickHandler?: (e: any) => void;
  classes?: string | string[];
}

function Button({
  icon,
  frameSize = 60,
  shadow = false,
  clickHandler = () => {},
  classes = "",
}: Props) {
  const color = "amber";
  const iconSize = "60%";
  const {activeSection} = useActiveSection();

  return (
    <div
      className={cs(
        `_container _button ${icon} relative`,
        classes,
        activeSection === classes
      )}
      onClick={(e) => {
        clickHandler.call(null, e);
      }}>
      {!!shadow && <div className={"_frame underlay absolute"}></div>}

      <div className="_frame overlay absolute">
        <Icon {...{icon, color, size: iconSize}} />
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
        ._container.arrow_up,
        ._container.arrow_down,
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

const staticStyles = {
  "_frame.overlay": `._frame.overlay {display: flex;
  justify-content: center;
  align-items: center;}`,
};

export {Button};
