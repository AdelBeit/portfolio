import React from "react";
import { scale } from "../../utils/scale";

interface Props {
  title: string;
  degree: string;
  width: number;
}

export default function Education({ title, degree, width = 0 }: Props) {
  const _name = "education";
  const initialWidth = 352;
  const initialHeight = 252;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;
  return (
    <div className={"_card relative " + _name}>
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
        <span>{title}</span>
      </div>
      <div className="_contentBox degree absolute small">
        <span>{degree}</span>
      </div>
      <style jsx>{`
        ._card {
          width: ${width}px;
          height: ${height}px;
        }

        ._svg.logo {
          height: 40%;
          width: 40%;

          margin-top: ${scalingFactor * 110}px;
          margin-left: ${scalingFactor * 5}px;

          fill: var(--green);
          stroke: var(--green);
        }

        ._contentBox {
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

        ._contentBox.degree {
          width: 50%;
          height: ${scalingFactor * 55}px;
          margin-top: ${scalingFactor * 125}px;
          margin-left: ${scalingFactor * 143}px;
          padding: 0px;

          align-items: flex-start;
        }
        @media only screen and (max-width: 350px) {
          ._contentBox.degree {
            --small: clamp(10px, 11px, 12px);
          }
        }
      `}</style>
    </div>
  );
}
