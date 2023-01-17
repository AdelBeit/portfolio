import React from "react";
import { scale } from "../../lib/scale";
import Baguette from "../Baguette";

interface PostProps {
  content?: string;
  width: number;
}

export default function About({
  content = "post title",
  width = 0,
}: PostProps) {
  const _name = "blog_post";
  const buttons = new Map([["info", { clickHandler: () => {} }]]);
  const initialWidth = 357;
  const initialHeight = 325;
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
      <div className="_contentBox absolute">
        <p>{content}</p>
      </div>
      <div className="_baguette absolute">
        <Baguette crumbs={buttons} _type="button" />
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
          align-items: flex-start;

          width: 85%;
          height: ${scalingFactor * 280}px;
          margin-top: ${scalingFactor * 30}px;
          margin-left: ${scalingFactor * 8}px;
          padding: 5px 15px;
        }

        ._baguette {
          margin-top: ${scalingFactor * 65}px;
          margin-left: ${scalingFactor * 319}px;
        }
      `}</style>
    </div>
  );
}
