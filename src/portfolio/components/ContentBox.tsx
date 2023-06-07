import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ContentBox({children}: Props) {
  return (
    <div
      id="_viewbox"
      className="_container relative hide-scroll-bar z-index-10">
      {children}
      <style jsx>{`
        ._container {
          height: 98vh;
          width: 82vw;

          display: flex;
          flex-direction: column;
          gap: 50px;

          margin: 0 10px;
          overflow: hidden;
          overflow-y: scroll;
        }
        @media only screen and (max-width: 780px) {
          ._container {
            width: 100vw;
            margin: 0;
          }
          ._container:after {
            content: "";
            margin-bottom: 3vh;
          }
        }
      `}</style>
    </div>
  );
}
