import React, { useState } from "react";
import { BaseSectionProps } from "../../types";
import GlitchyText from "../GlitchyText";
import { TypeWriter } from "../TyperWriter";

interface Props extends BaseSectionProps {
  title: string;
  role: string;
  description: string;
  keywords: string[];
}

export default function Landing({ title, role, description, keywords }: Props) {
  const [index, setIndex] = useState<number>(0);
  const words = keywords;

  return (
    <div id="_landing" className="_section relative">
      <div className="_container relative">
        <div className="_contentBox title extra-large">
          <span>{title}</span>
        </div>
        <div className="_contentBox role large">
          <span>{role}</span>
        </div>
        <div className="_contentBox description thin-font small">
          <span>
            {index == 0 ? (
              <TypeWriter
                content={description}
                cb={({ typer }) => {
                  typer.stop();
                  setIndex(1);
                }}
              />
            ) : (
              <span>{description}</span>
            )}
            {index == 1 && (
              <TypeWriter
                content={words[0]}
                extraStyles={"_CG_word _CG_layer _CG_glitch"}
                cb={({ parent, typer }) => {
                  parent.classList.add("none");
                  typer.stop();
                  setIndex(2);
                }}
              />
            )}
            {index == 2 && <GlitchyText text={words} />}
          </span>
        </div>
      </div>
      <style jsx>{`
        ._container {
          width: 100vw;
          height: 90vh;
          padding-left: 10%;

          display: flex;
          flex-direction: column;
          gap: 10vh;
        }

        ._contentBox.title {
          margin-top: 10vh;
        }
        ._contentBox.description {
          padding: 15px;
          margin-left: -15px;
          background-color: rgba(40, 40, 40, 0.5);
          max-width: 800px;
        }

        @media only screen and (min-height: 800px) {
          ._container {
            gap: 15vh;
          }
        }
        @media only screen and (max-width: 1400px) {
          ._container {
            padding-left: 5%;
          }
        }
        @media only screen and (max-width: 780px) {
          ._contentBox.title {
            margin-top: 8vh;
            margin-bottom: -2vh;
          }
        }
        @media only screen and (max-width: 600px) {
          ._container {
            margin-bottom: 8vh;
          }
        }
      `}</style>
    </div>
  );
}
