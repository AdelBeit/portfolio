import cs from "classnames";
import React, { useState } from "react";
import { useWidth } from "../../store/WidthStore";
import { linkHandler } from "../../utils/linkHandler";
import { scale } from "../../utils/scale";
import Baguette from "../Baguette";
import Icon from "../Icon";

interface Props {
  title: string;
  description: string[];
  techStack: string[];
  links: { CODE: string; LINK: string; VIDEO: string };
  width: number;
}

// TODO: fix tech stack to import from data
// TODO: passive scroll on tech stack
// TODO: modularize the card svg components to adjust height and slide down amount

export default function Product({
  title,
  description,
  links,
  techStack: stack,
  width = 0,
}: Props) {
  const [active, setActive] = useState(false);

  const getMediaType = (filePath: string) => {
    const imageFormats = ["jpeg", "jpg", "png", "gif", "bmp", "webp"];
    const videoFormats = ["mp4", "avi", "mov", "wmv", "mkv"];
    const s = filePath.split(".");
    const fileType = s[s.length - 1];
    if (imageFormats.includes(fileType.toLowerCase())) {
      return ["image", fileType];
    }
    if (videoFormats.includes(fileType.toLowerCase())) {
      return ["video", fileType];
    }
    if (fileType === "") return ["", ""];
    throw new Error("file type unknown");
  };

  const media = getMediaType(links.VIDEO);

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
    ["info", { icon: "info", clickHandler: expandHandler }],
    ["github", { icon: "github", clickHandler: linkHandler(links["code"]) }],
    // ["link", { icon: "link", clickHandler: linkHandler(links.LINK) }],
  ]);

  const techStack = [
    "github",
    "javascript",
    "react",
    "typescript",
    "git",
    "docker",
  ];
  const _name = "product";
  const initialWidth = 352;
  const initialHeight = 620;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  const windowWidth = useWidth((state) => state.width);
  let techStackFrameSize = 30;
  let techStackMarginLeft = -14;
  if (windowWidth <= 400) {
    techStackFrameSize *= scalingFactor;
    techStackMarginLeft = -8;
  }

  let ButtonFrameSize = 60;
  ButtonFrameSize =
    windowWidth <= 480 ? ButtonFrameSize * scalingFactor : ButtonFrameSize;

  return (
    <div
      className="_card _product relative"
      style={{ width: width, height: height }}
    >
      <object
        className="_svg absolute"
        id="card_svg"
        data={"./svgs/cards/animated/product.svg"}
        type="image/svg+xml"
      ></object>
      <a href={links.LINK}>
        <div className="_contentBox title absolute">
          <span className="icon">
            <Icon icon="link" />
          </span>
          <span className="text">{title}</span>
        </div>
      </a>
      <div className="_baguette buttons absolute">
        <Baguette
          crumbs={buttons}
          _type="button"
          {...{ frameSize: ButtonFrameSize }}
        />
      </div>
      <div className="_baguette tech_stack absolute">
        <Baguette
          crumbs={techStack}
          _type="icon"
          {...{ frameSize: techStackFrameSize }}
        />
      </div>
      <div className={cs("_contentBox demo absolute", !active && "hide")}>
        {media[0] === "image" ? (
          <img src={links.VIDEO} />
        ) : media[0] === "video" ? (
          <video src={links.VIDEO} controls />
        ) : null}
      </div>
      <div className="_contentBox hide-scroll-bar description absolute">
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

        a {
          color: var(--black);
          cursor: pointer;
          text-decoration: underline;
        }

        a:focus,
        a:hover {
          color: var(--amber);
          text-decoration: none;
          fill: var(--amber);
        }

        ._contentBox {
          justify-content: flex-start;
        }

        ._contentBox.title {
          width: 97.5%;
          margin-top: ${scalingFactor * 5}px;
          margin-left: ${scalingFactor * 0.01}px;
          padding: 5px 15px;

          align-items: center;
          text-decoration: inherit;
        }

        ._contentBox.title .icon {
          width: 1em;
          height: 1em;
          margin-top: 0.4em;
          margin-left: -0.15em;
          margin-right: -0.15em;
        }

        ._contentBox.description {
          width: 85%;
          height: ${scalingFactor * 530}px;
          margin-top: ${scalingFactor * 72}px;
          margin-left: ${scalingFactor * 5}px;
          padding: 0px 15px;
          padding-top: 20px;

          align-items: flex-start;

          overflow-y: hidden;
        }

        ._contentBox.description ul {
          margin-top: ${active ? scalingFactor * 350 : 0}px;
          transition: margin-top 0.18s ease-in-out;
        }

        ._contentBox.demo {
          width: 83%;
          height: 300px;

          margin-left: 23px;
          margin-top: ${scalingFactor * 102}px;
          opacity: ${active ? 1 : 0};

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          transition: opacity 0.2s;
        }

        ._contentBox.demo img,
        ._contentBox.demo video {
          width: 100%;
          height: auto;
          align-self: flex-end;
        }

        ._baguette {
          display: flex;
          flex-direction: column;
          padding: 0;
          gap: 10px;
        }

        ._baguette.buttons {
          margin-top: ${scalingFactor * 89}px;
          margin-left: ${scalingFactor * 320}px;
        }

        ._baguette.tech_stack {
          margin-top: ${scalingFactor * 110}px;
          margin-left: ${techStackMarginLeft}px;
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
