import React from "react";

interface Props {
  title: string;
  role: string;
  content: string;
  keywords: string[];
}

export default function Landing({ title, role, content, keywords }: Props) {
  return (
    <div className="_section" id="_landing">
      <div className="_container relative">
        <div className="_contentBox title absolute extra-large">
          <p>{title}</p>
        </div>
        <div className="_contentBox role absolute medium">
          <p>{role}</p>
        </div>
        <div className="_contentBox content absolute small">
          <p>{content}</p>
        </div>
        <div className="_contentBox keywords absolute medium">
          <p>{keywords}</p>
        </div>
      </div>
      <style jsx>{`
        ._container {
          width: 100vw;
          height: 90vh;
          padding-left: 10%;
        }
        ._contentBox {
          z-index: 1;
          display: flex;
        }

        ._contentBox.title {
          top: 100px;
        }
        ._contentBox.role {
          top: 300px;
        }
        ._contentBox.content {
          top: 400px;
        }
        ._contentBox.keywords {
          top: 450px;
        }
      `}</style>
    </div>
  );
}
