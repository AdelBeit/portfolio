import React from "react";
import { scale } from "../../lib/scale";
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
  const name = "about";
  const buttons = ["linkedin", "github", "resume", "email"];
  const initialWidth = 379;
  const initialHeight = 720;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  // have height and width initials
  // pass in width
  // get svg from cards.svg store
  // use bagguette nav with initialized buttons
  // position buttons, modify based on width
  // position content, modify based on width
  // ** figure out how to make a factory for this

  return (
    <div className="_card relative" style={{ width: width, height: height }}>
      <svg className="_svg absolute" xmlns="https://www.w3.org/2000/svg">
        <use
          href={`./svg stores/cards.svg#${name}`}
          xlinkHref={`./svg stores/cards.svg#${name}`}
          x="0"
          y="0"
        ></use>
      </svg>
      <div className="_contentBox title absolute ">
        <p>
          {title}, slider: {width}, scaling: {scalingFactor}, top: {20}
        </p>
      </div>
      <div className="_bagguette outline absolute">
        <Frame icon="typescript" _type="button" />
      </div>
      <div className="_contentBox description absolute ">
        <p>{description}</p>
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
        }

        ._contentBox.description {
          width: 85%;
          height: ${scalingFactor * 630}px;
          margin-top: ${scalingFactor * 72}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 0px 15px;

          align-items: flex-start;
        }

        ._bagguette {
          display: flex;
          flex-direction: column;
          gap: 5px;
          right: 0;
          top: 0;
        }
      `}</style>
    </div>
  );
}
