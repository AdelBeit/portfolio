import React from "react";
import { scale } from "../../lib/scale";
import Frame from "../Frame";

interface EducationProps {
  title?: string;
  description?: string;
  width: number;
}

export default function Education({
  title = "university",
  description = "BS in BS",
  width = 0,
}: EducationProps) {
  const _name = "education";
  const initialWidth = 352;
  const initialHeight = 252;
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
      <svg className="_svg logo absolute" xmlns="https://www.w3.org/2000/svg">
        <use
          href={`./svg stores/icons.svg#iu`}
          xlinkHref={`./svg stores/icons.svg#iu`}
          x="0"
          y="0"
        ></use>
      </svg>
      <div className="_contentBox title absolute">
        <p>{title}</p>
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
         
         ._svg.logo{
         height: 40%;
         width: 40%;

         margin-top: ${scalingFactor * 110}px;
         margin-left: ${scalingFactor * 5}px;
        }

        ._contentBox {
          z-index: 1;
          display: flex;
          justify-content: flex-start;
          color: var(--green);
        }

        ._contentBox.title {
          width: 75%;
          height: ${scalingFactor * 52}px;
          margin-top: ${scalingFactor * 5}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 5px 15px;
          
          align-items: center;
          
          color: var(--black);          
        }

        ._contentBox.description {
          width: 50%;
          height: ${scalingFactor * 55}px;
          margin-top: ${scalingFactor * 135}px;
          margin-left: ${scalingFactor * 143}px;
          padding: 0px;

          align-items: flex-start;
        `}</style>
    </div>
  );
}
