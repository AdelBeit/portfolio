import React from "react";

interface Props {
  title: string;
  role: string;
  content: string;
  keywords: string[];
}

export default function Landing({ title, role, content, keywords }: Props) {
  return (
    <div id="_landing" className="_section">
      <div className="_container relative">
        <div className="_contentBox title extra-large">
          <span>{title}</span>
        </div>
        <div className="_contentBox role medium">
          <span>{role}</span>
        </div>
        <div className="_contentBox content extra-small outline-neon">
          <span>{content}</span>
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
        ._contentBox.content {
          padding: 15px;
          margin-left: -15px;
          background: rgba(40, 40, 40, 0.5);
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
