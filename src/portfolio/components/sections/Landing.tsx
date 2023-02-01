import React, { useEffect } from "react";
import Typer from "../../utils/Typer";

interface Props {
  title: string;
  role: string;
  description: string;
  keywords: string[];
}

export default function Landing({ title, role, description, keywords }: Props) {
  useEffect(() => {
    const typer = new Typer("._contentBox.description span", description);
    return () => typer.destroy();
  }, []);
  return (
    <div id="_landing" className="_section">
      <div className="_container relative">
        <div className="_contentBox title extra-large">
          <span>{title}</span>
        </div>
        <div className="_contentBox role large">
          <span>{role}</span>
        </div>
        <div className="_contentBox description thin-font small outline-neon">
          <span></span>
        </div>
      </div>
      <style jsx>{`
        ._container {
          width: 100vw;
          height: 90vh;
          padding-left: 7%;

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
          background: rgba(40, 40, 40, 0.5);
          max-width: 800px;
        }

        @media only screen and (min-height: 800px) {
          ._container {
            gap: 15vh;
          }
        }
        @media only screen and (min-width: 1401px) {
          ._container {
            padding-left: 10%;
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
