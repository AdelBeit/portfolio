import React from "react";

interface Props {
  icon: string;
  size?: string;
}

export default function Icon({ icon, size = "60%" }: Props) {
  const animatedIcons = ["arrowup", "arrowdown", "music"];
  const isAnimated = animatedIcons.some((e) => icon.includes(e));
  const path = (isAnimated ? "./#" : "./svg stores/icons.svg#") + icon;
  return (
    <div className={`_container _icon ${icon} relative`}>
      <svg className="_svg absolute" xmlns="https://www.w3.org/2000/svg">
        <use href={path} xlinkHref={path} x="0" y="0"></use>
      </svg>
      <style jsx>{`
        ._container {
          width: ${size};
          height: ${size};
        }

        .arrowup,
        .arrowdown {
          width: 40px;
          height: 40px;
        }
        .music {
          width: 60px;
          height: 60px;
          top: 10px;
        }
      `}</style>
    </div>
  );
}
