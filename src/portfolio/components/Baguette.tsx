import React from "react";
import Frame, { FrameProps } from "./IconFrame";

interface BaseProps<P extends { _type: string }> {
  _type: P["_type"];
  crumbs: any;
  frameProps?: Pick<
    FrameProps,
    "iconSize" | "frameSize" | "border" | "borderSize"
  >;
}

interface IconBaguette extends BaseProps {
  _type: "icon";
  crumbs: string[];
}

interface ButtonBaguette extends BaseProps {
  _type: "button";
  crumbs: { [key: string]: Pick<FrameProps, "clickHandler"> };
}

type Props<F extends FrameProps> = F['_type'] extends 'string' ? {crumbs: string[]} & IconFrame

export default function Baguette({ crumbs, {...frameProps} }: BaguetteProps) {
  if (_type == "button") {
    return (
      <>
        {Object.keys(crumbs).map((crumbKey, _index) => {
          <Frame
            key={_index}
            icon={crumbKey}
            _type={_type}
            clickHandler={crumbs[crumbKey].clickHandler}
            {...frameProps}
          />;
        })}
      </>
    );
  }

  return (
    <>
      {crumbs.map((crumb, _index) => (
        <Frame key={_index} icon={crumb} _type={_type} {...frameProps} />
      ))}
    </>
  );
}
