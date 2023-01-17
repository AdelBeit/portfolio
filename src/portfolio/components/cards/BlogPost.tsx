import React from "react";
import { scale } from "../../lib/scale";
import Baguette from "../Baguette";
import Frame from "../IconFrame";

interface AboutProps {
  title?: string;
  description?: string;
  width: number;
}

export default function About({
  title = "title",
  description = "description",
  width = 0,
}: AboutProps) {
  const _name = "blog_post";
  const buttons = new Map([["info", { clickHandler: () => {} }]]);
  const initialWidth = 379;
  const initialHeight = 720;
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
      <div className="_baguette absolute">
        <Baguette crumbs={buttons} _type="button" />
      </div>
      <div className="_contentBox description absolute">
        <p>{description}</p>
      </div>
      <style jsx>{`
        ._card {
          width: ${width}px;
          height: ${height}px;
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
        }

        ._contentBox.description {
          width: 85%;
          height: ${scalingFactor * 630}px;
          margin-top: ${scalingFactor * 72}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 0px 15px;

          align-items: flex-start;
        }

        ._baguette {
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
