import React, { useState } from "react";
import { linkHandler } from "../../utils/linkHandler";
import { scale } from "../../utils/scale";
import Baguette from "../Baguette";

interface ProductProps {
  title: string;
  description: string[];
  techStack: string[];
  links: { CODE: string; DEMO: string; VIDEO: string };
  width: number;
}

export default function Product({
  title,
  description,
  links,
  techStack: stack,
  width = 0,
}: ProductProps) {
  const [active, setActive] = useState(false);

  const expandHandler = (e: React.MouseEvent<HTMLElement>) => {
    let animationStage = active ? ".p1" : ".p0";
    let current = e.target as HTMLElement;
    while (!current.classList.contains("_card")) {
      current = current.parentElement;
    }

    let animateElement: SVGAnimateElement = (
      current.querySelector("#card_svg") as HTMLObjectElement
    ).contentDocument.querySelector(animationStage);
    animateElement.beginElement();

    let buttonElement = current.querySelector("._button.info");
    buttonElement.classList.toggle("active");

    setActive((prevState) => !prevState);
  };

  const buttons = new Map([
    ["info", { clickHandler: expandHandler }],
    ["github", { clickHandler: linkHandler(links["code"]) }],
    ["demo", { clickHandler: linkHandler(links["demo"]) }],
  ]);

  const techStack = [
    "github",
    "javascript",
    "react",
    "typescript",
    "git",
    "docker",
  ];

  const initialWidth = 352;
  const initialHeight = 620;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  return (
    <div
      className="_card _product relative"
      style={{ width: width, height: height }}
    >
      <object
        className="_svg absolute"
        id="card_svg"
        data={"./cards/product.svg"}
        type="image/svg+xml"
      ></object>
      <div className="_contentBox title absolute">
        <p>{title}</p>
      </div>
      <div className="_baguette buttons absolute">
        <Baguette crumbs={buttons} _type="button" />
      </div>
      <div className="_baguette tech_stack absolute">
        <Baguette crumbs={techStack} _type="icon" />
      </div>
      <div className="_contentBox description absolute">
        <ul>
          {description.map((desc, _index) => (
            <li key={_index}>{desc}</li>
          ))}
        </ul>
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
          width: 97.5%;
          height: ${scalingFactor * 52}px;
          margin-top: ${scalingFactor * 5}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 5px 15px;

          align-items: center;
          color: var(--black);
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
          padding: 0;
          gap: 6px;
        }

        ._baguette.buttons {
          margin-top: ${scalingFactor * 89}px;
          margin-left: ${scalingFactor * 312}px;
        }

        ._baguette.tech_stack {
          margin-top: ${scalingFactor * 110}px;
          margin-left: ${scalingFactor * -11}px;
        }

        ul {
          padding: 0;
          padding-left: 30px;
          max-width: 100%;
        }
        li {
          padding-right: 10px;
          word-wrap: break-word;
        }
        li:not(:last-child) {
          margin-bottom: 7px;
        }
      `}</style>
    </div>
  );
}
