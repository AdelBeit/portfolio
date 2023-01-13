import React from "react";
import Frame, {
  ButtonFrameProps,
  ButtonOrIcon,
  IconFrameProps,
} from "./IconFrame";

type BaguetteProps<T extends ButtonOrIcon, K extends keyof T> =
  | ({ crumbs: K["icon"][] } & IconFrameProps)
  | ({
      crumbs: {
        [key: ButtonFrameProps["icon"]]: Pick<ButtonFrameProps, "clickHandler">;
      };
    } & ButtonFrameProps);

export default function Baguette(props: BaguetteProps) {
  if (props["_type"] == "button") {
    return (
      <>
        {Object.keys(props.crumbs).map((crumbKey, _index) => {
          <Frame
            key={_index}
            icon={crumbKey}
            _type={props._type}
            clickHandler={props.crumbs[crumbKey].clickHandler}
            {...props}
          />;
        })}
      </>
    );
  }

  return (
    <>
      {props.crumbs.map((crumb, _index) => (
        <Frame key={_index} icon={crumb} _type={props._type} {...props} />
      ))}
    </>
  );
}
