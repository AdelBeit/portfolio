import React from "react";
import { useWidth } from "../../store/WidthStore";
import { scale } from "../../utils/scale";
import Baguette from "../Baguette";

interface Props {
  icons: string[];
  width: number;
}

// TODO: do a glitch animation at some other point

export default function TechStack({ icons, width = 0 }: Props) {
  const _name = "tech_stack";
  const title = "TECH STACK";
  const initialWidth = 352;
  const initialHeight = 466;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  const windowWidth = useWidth((state) => state.width);
  let frameSize = 45;
  let gridGap = 20;
  if (windowWidth <= 480) {
    gridGap = 15 * scalingFactor;
    frameSize *= scalingFactor;
  }
  const gridRepeatHeight = (gridGap + frameSize) * 8;

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
      <div className="_contentBox title absolute">
        <span>{title}</span>
      </div>
      <div className="_container relative">
        <div className="_icons hide-scroll-bar absolute passive-scroll">
          <Baguette
            crumbs={[...icons, ...icons]}
            _type="icon"
            {...{ frameSize }}
          />
        </div>
      </div>
      <style jsx>{`
        ._card {
          width: ${width}px;
          height: ${height}px;
        }

        ._contentBox {
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

        ._container {
          width: 85%;
          height: 75%;

          margin-top: ${scalingFactor * 98}px;
          margin-left: ${scalingFactor * 23}px;

          overflow: hidden;
        }

        ._icons {
          width: 100%;
          height: 100%;

          display: grid;
          grid-template-columns: repeat(5, ${frameSize}px);
          grid-template-rows: repeat(20, ${frameSize}px);
          grid-gap: ${gridGap}px;
        }

        @keyframes Passive-YScroll {
          100% {
            transform: translateY(-${gridRepeatHeight}px);
          }
        }
      `}</style>
    </div>
  );
}
