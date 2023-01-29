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
      <div className="_container">
        <div className="_contentBox title extra-large">
          <p>{title}</p>
        </div>
        <div className="_contentBox role medium">
          <p>{role}</p>
        </div>
        <div className="_contentBox content small outline-neon">
          <p>{content}</p>
        </div>
        <div className="_contentBox keywords extra-small">
          <p>{keywords}</p>
        </div>
      </div>
      <style jsx>{`
        ._container {
          width: 100vw;
          height: 90vh;
          padding-left: 7%;

          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        ._contentBox {
          z-index: 1;
          display: flex;
        }

        ._contentBox.title {
        }
        ._contentBox.role {
        }
        ._contentBox.content {
          border: ;
        }
        ._contentBox.keywords {
        }
        @media only screen and (max-width: 1400px) {
          ._container {
            padding-left: 5%;
          }

          ._contentBox.title {
            margin: -20px 0;
          }
        }
      `}</style>
    </div>
  );
}
