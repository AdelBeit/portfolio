import React from "react";
import {ICON_MAPPINGS} from "../../../../public/svgs/icons/mapping";
import {BaseFrameProps} from "../../types";
import Icon from "../Icon";

export interface Props extends BaseFrameProps {
  border?: boolean;
  borderSize?: number;
}

function IconFrame({
  icon,
  frameSize = 30,
  border = true,
  borderSize = 2,
}: Props) {
  const iconSize = "66%";
  icon = icon.toUpperCase();

  return (
    <div className="_container relative">
      <div className="_frame overlay absolute">
        <Icon {...{icon, size: iconSize}} />
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
          content: "${ICON_MAPPINGS[icon.toLowerCase()]}";
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

const staticStyles = {
  "_frame.overlay": `._frame.overlay {display: flex;
  justify-content: center;
  align-items: center;}`,
};

export {IconFrame as Icon};
