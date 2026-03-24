import cs from "classnames";
import React, { useEffect, useRef, useState } from "react";
import {useWidth} from "@/portfolio/store/WidthStore";
import {scale} from "@/portfolio/utils/scale";
import {Button as ButtonFrame} from "@/portfolio/components/frames/Button";
import {Icon as IconFrame} from "@/portfolio/components/frames/Icon";
import Icon from "@/portfolio/components/Icon";
import {usePortalModal} from "@/portfolio/hooks/usePortalModal";
// import {useIdleVideoPreload} from "@/portfolio/hooks/useIdleVideoPreload";
import DemoThumbnailButton from "@/portfolio/components/DemoThumbnailButton";
import DemoVideoModal from "@/portfolio/components/DemoVideoModal";
import {getMediaType} from "@/portfolio/utils/media";
import {useInViewOnce} from "@/portfolio/hooks/useInViewOnce";

interface Props {
  title: string;
  description: string[];
  techStack: string[];
  links: {CODE: string; LINK: string; VIDEO: string; THUMBNAIL?: string};
  width: number;
  isOpen?: boolean;
  onToggle?: (next: boolean) => void;
}

const ERROR_STYLE: React.CSSProperties = {
  backgroundColor: "var(--black)",
  border: "2px solid var(--black)",
  color: "var(--green)",
  padding: 10,
  margin: 10,
};

// TODO: passive scroll on tech stack
// TODO: modularize the card svg components to adjust height and slide down amount

export default function Product({
  title,
  description,
  links,
  techStack: stack,
  width = 0,
  isOpen,
  onToggle,
}: Props) {
  const [active, setActive] = useState(false);
  const isControlled = typeof isOpen === "boolean";
  const activeState = isControlled ? isOpen : active;
  const { open, close, Modal } = usePortalModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewOnce(cardRef, { threshold: 0.05 });
  const didMountRef = useRef(false);

  const media = getMediaType(links.VIDEO);
  // useIdleVideoPreload(links.VIDEO, media[0] === "video" && active);

  const shouldMountMedia = isInView || activeState;

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const current = cardRef.current;
    if (!current) return;
    const buttonElement = current.querySelector("._button.info");
    if (buttonElement) {
      buttonElement.classList.toggle("active", activeState);
    }
    const animationStage = activeState ? ".p0" : ".p1";
    const objectEl = current.querySelector("#card_svg") as HTMLObjectElement | null;
    const svgDoc = objectEl?.contentDocument;
    const animateElement = svgDoc?.querySelector(animationStage) as
      | SVGAnimateElement
      | null;
    animateElement?.beginElement();
  }, [activeState]);
  const expandHandler = () => {
    if (isControlled) {
      onToggle?.(!activeState);
    } else {
      setActive((prevState) => !prevState);
    }
  };

  const openModal = () => open();

  const initialWidth = 352;
  const initialHeight = 620;
  const height = scale(initialHeight, initialWidth, width);

  const scalingFactor = width / initialWidth;

  const windowWidth = useWidth().width;
  let techStackFrameSize = 30;
  let techStackMarginLeft = -14;
  let techStackGap = 10;
  if (windowWidth <= 400) {
    techStackFrameSize *= scalingFactor;
    techStackMarginLeft = -8;
    techStackGap = 3;
  }

  let ButtonFrameSize = 60;
  ButtonFrameSize =
    windowWidth <= 480 ? ButtonFrameSize * scalingFactor : ButtonFrameSize;

  return (
    <div ref={cardRef} className="_card _product relative">
      <object
        className="_svg absolute"
        id="card_svg"
        data={"./svgs/cards/animated/product.svg"}
        type="image/svg+xml"></object>
      <a href={links.LINK}>
        <div className="_contentBox title absolute">
          <span className="icon">
            <Icon icon="link" />
          </span>
          <span className="text">{title}</span>
        </div>
      </a>
      <div className="_baguette buttons absolute">
        <ButtonFrame
          frameSize={ButtonFrameSize}
          icon="info"
          clickHandler={expandHandler}
        />
        <a href={links.CODE} target="_blank">
          <ButtonFrame frameSize={ButtonFrameSize} icon="code" />
        </a>
      </div>
      <div className="_baguette tech_stack absolute">
        {stack.map((icon, _i) => (
          <IconFrame
            key={_i}
            icon={icon}
            frameSize={techStackFrameSize}
            borderSize={0}
          />
        ))}
      </div>
      <div className={cs("_contentBox demo absolute", !activeState && "hide")}>
        {media[0] === "image" ? (
          shouldMountMedia ? <img src={links.VIDEO} /> : null
        ) : media[0] === "video" ? (
          <DemoThumbnailButton
            title={title}
            thumbnailUrl={links.THUMBNAIL}
            onClick={openModal}
            showThumbnail={shouldMountMedia}
          />
        ) : (
          <span style={ERROR_STYLE}>Showcase video coming soon!</span>
        )}
      </div>
      <DemoVideoModal
        Modal={Modal}
        onClose={close}
        videoUrl={links.VIDEO}
        posterUrl={links.THUMBNAIL}
      />
      <div className="_contentBox hide-scroll-bar description disable-selection absolute">
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
          text-decoration: none;
          color: var(--amber);
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
          z-index: 1;
          pointer-events: ${activeState ? "none" : "auto"};
        }

        ._contentBox.description ul {
          margin-top: ${activeState ? scalingFactor * 350 : 0}px;
          transition: margin-top 0.18s ease-in-out;
        }

        ._contentBox.demo {
          width: 83%;
          height: 300px;

          margin-left: 23px;
          margin-top: ${scalingFactor * 102}px;
          opacity: ${activeState ? 1 : 0};

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          transition: opacity 0.2s;
          z-index: 2;
          pointer-events: ${activeState ? "auto" : "none"};
        }

        ._baguette {
          display: flex;
          flex-direction: column;
          padding: 0;
          gap: ${techStackGap}px;
        }

        ._baguette.buttons {
          margin-top: ${scalingFactor * 89}px;
          margin-left: ${scalingFactor * 320}px;
        }

        ._baguette.tech_stack {
          margin-top: ${scalingFactor * 110}px;
          margin-left: ${techStackMarginLeft}px;
          border: 2px solid var(--green);
          background-color: var(--black);
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
