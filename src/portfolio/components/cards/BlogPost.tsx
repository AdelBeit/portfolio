import React from "react";
import { useWidth } from "../../store/WidthStore";
import { linkHandler } from "../../utils/linkHandler";
import { scale } from "../../utils/scale";
import Baguette from "../Baguette";

interface Props {
  title: string;
  link: string;
  width: number;
}

export default function BlogPost({ title, link, width = 0 }: Props) {
  const _name = "blog_post";
  const buttons = new Map([
    ["info", { icon: "info", clickHandler: linkHandler(link) }],
  ]);
  const initialWidth = 357;
  const initialHeight = 325;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  const windowWidth = useWidth((state) => state.width);
  let frameSize = 60;
  frameSize = windowWidth <= 480 ? frameSize * scalingFactor : frameSize;

  return (
    <div className={"_card relative none " + _name}>
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
      <div className="_baguette absolute">
        <Baguette crumbs={buttons} _type="button" />
      </div>
      <style jsx>{`
        ._card {
          width: ${width}px;
          height: ${height}px;
        }

        ._contentBox {
          justify-content: flex-start;
          align-items: flex-start;

          width: 85%;
          height: ${scalingFactor * 280}px;
          margin-top: ${scalingFactor * 30}px;
          margin-left: ${scalingFactor * 8}px;
          padding: 5px 15px;
          font-size: 18px;
        }

        ._baguette {
          margin-top: ${scalingFactor * 65}px;
          margin-left: ${scalingFactor * 319}px;
        }
      `}</style>
    </div>
  );
}
