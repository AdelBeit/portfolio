import React from "react";

interface ContentBoxProps {
  children: React.ReactNode;
}

export default function ContentBox({ children }: ContentBoxProps) {
  return (
    <div className="_container">
      {children}
      <style jsx>{`
        ._container {
          height: 100%;
          width: 82%;

          display: flex;
          flex-direction: column;
          gap: 50px;

          margin: 10px;

          // overflow: scroll;
          // scrollbar-width: none; /* Firefox */
          // -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        ._container::-webkit-scrollbar {
          // /* WebKit */
          // width: 0;
          // height: 0;
        }
      `}</style>
    </div>
  );
}
