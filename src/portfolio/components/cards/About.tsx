import React from "react";
import { useWidth } from "../../store/WidthStore";
import { linkHandler } from "../../utils/linkHandler";
import { scale } from "../../utils/scale";
import Baguette from "../Baguette";
import { TypeWriter } from "../TyperWriter";

interface Props {
  title: string;
  description: string;
  width: number;
  links: { LINKEDIN: string; GITHUB: string; RESUME: string; EMAIL: string };
}

// TODO: modularize svg so height can be adjusted better

export default function About({ title, description, links, width = 0 }: Props) {
  const _name = "about";
  const buttons = new Map([
    ["github", { icon: "github", clickHandler: linkHandler(links.GITHUB) }],
    [
      "linkedin",
      { icon: "linkedin", clickHandler: linkHandler(links.LINKEDIN) },
    ],
    ["email", { icon: "email", clickHandler: linkHandler(links.EMAIL) }],
    ["resume", { icon: "resume", clickHandler: linkHandler(links.RESUME) }],
  ]);
  const initialWidth = 379;
  const initialHeight = 720;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  const windowWidth = useWidth().width;
  let frameSize = 60;
  frameSize = windowWidth <= 480 ? frameSize * scalingFactor : frameSize;

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
      <div className="_baguette absolute">
        <Baguette crumbs={buttons} _type="button" {...{ frameSize }} />
      </div>
      <div className="_contentBox description hide-scroll-bar absolute">
        <TypeWriter content={description} />
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
          width: 97.5%;
          height: ${scalingFactor * 52}px;
          margin-top: ${scalingFactor * 5}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 5px 15px;

          align-items: center;
        }

        ._contentBox.description {
          width: 82%;
          height: ${scalingFactor * 630}px;
          margin-top: ${scalingFactor * 72}px;
          margin-left: ${scalingFactor * 5}px;
          padding: ${scalingFactor * 10}px 15px 30px ${scalingFactor * 15}px;

          align-items: flex-start;
          overflow-y: scroll;
        }

        ._baguette {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0;
          margin-top: ${scalingFactor * 110}px;
          margin-left: ${scalingFactor * 322}px;
        }
      `}</style>
    </div>
  );
}
