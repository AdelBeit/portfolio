import React from "react";
import { scale } from "../../lib/scale";
import Frame from "../IconFrame";

interface TechStackProps {
  title?: string;
  width: number;
}

export default function TechStack({
  title = "tech stack",
  width = 0,
}: TechStackProps) {
  const _name = "tech-stack";
  const icons = [
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
  ];
  const initialWidth = 348;
  const initialHeight = 605;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  return (
    <div className="_card relative" style={{ width: width, height: height }}>
      <svg className="_svg absolute" xmlns="https://www.w3.org/2000/svg">
        <use
          href={`./svg stores/cards.svg#${_name}`}
          xlinkHref={`./svg stores/cards.svg#${_name}`}
          x="0"
          y="0"
        ></use>
      </svg>
      <div className="_contentBox title absolute">
        <p>{title}</p>
      </div>
      <div className="_icons outline absolute">
        {icons.map((buttonIcon, _index) => (
          <Frame
            key={_index}
            icon={buttonIcon}
            iconSize="80%"
            frameSize={30}
            _type="icon"
          />
        ))}
      </div>
      <style jsx>{`
        ._card {
          width: ${width};
          height: ${height};
        }

        ._svg {
          height: 100%;
          width: 100%;
        }

        ._contentBox {
          z-index: 1;
          display: flex;
          justify-content: flex-start;
        }

        ._contentBox.title {
          width: 97.5%;
          height: ${scalingFactor * 52}px;
          margin-top: ${scalingFactor * 5}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 5px 15px;

          align-items: center;

          color: var(--black);
        }

        ._icons {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 0;
          margin-top: ${scalingFactor * 120}px;
          margin-left: ${scalingFactor * 319}px;
        }
      `}</style>
    </div>
  );
}
