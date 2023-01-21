import React from "react";
import { scale } from "../../utils/scale";
import Baguette from "../Baguette";

interface TechStackProps {
  title?: string;
  width: number;
}

export default function TechStack({
  title = "tech stack",
  width = 0,
}: TechStackProps) {
  const _name = "tech_stack";
  const icons = [
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
    "github",
  ];
  const initialWidth = 352;
  const initialHeight = 466;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  return (
    <div className="_card relative " style={{ width: width, height: height }}>
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
      <div className="_icons">
        <Baguette crumbs={icons} _type="icon" frameSize={45} />
      </div>
      <style jsx>{`
        ._card {
          width: ${width}px;
          height: ${height}px;
        }

        ._contentBox {
          z-index: 1;
          display: flex;
          justify-content: flex-start;
        }

        ._contentBox.title {
          width: 75%;
          height: ${scalingFactor * 52}px;
          margin-top: ${scalingFactor * 5}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 5px 15px;
          color: var(--black);

          align-items: center;
        }

        ._icons {
          display: grid;
          grid-template-columns: repeat(5, 30px);
          grid-template-rows: repeat(4, 30px);
          grid-gap: 33px;

          margin-top: ${scalingFactor * 115}px;
          margin-left: ${scalingFactor * 23}px;
        }
      `}</style>
    </div>
  );
}
