import React from "react";
import Frame, { ButtonFrameProps, ButtonOrIcon, IconFrameProps } from "./Frame";

type BaguetteProps<T extends ButtonOrIcon> =
  | ({ crumbs: T["icon"][] } & Omit<IconFrameProps, "icon">)
  | ({
      crumbs: Map<
        ButtonFrameProps["icon"],
        Pick<ButtonFrameProps, "clickHandler">
      >;
    } & Omit<ButtonFrameProps, "clickHandler" | "icon">);

export default function Baguette<T extends ButtonOrIcon>(
  props: BaguetteProps<T>
) {
  let content;
  if (props["_type"] === "button") {
    return (
      <>
        {Array.from(props.crumbs.keys()).map((crumbKey, _index) => (
          <Frame
            {...props}
            key={_index}
            icon={crumbKey}
            _type={props._type}
            clickHandler={props.crumbs.get(crumbKey).clickHandler}
          />
        ))}
      </>
    );
  }

  if (props["_type"] === "icon")
    return (
      <>
        {props.crumbs.map((crumb, _index) => (
          <Frame {...props} key={_index} icon={crumb} _type={props._type} />
        ))}
      </>
    );

  return (
    <div className="_container fixed">
      {content}
      <style jsx>{`
        ._container {
          height: 98vh;
          width: fit-content;
          top: 0;
          right: 0;
          margin: 10px auto;
        }
      `}</style>
    </div>
  );
}
