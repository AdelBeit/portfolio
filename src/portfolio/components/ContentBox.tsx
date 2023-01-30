import React, { useEffect } from "react";

interface Props {
  handleIntersection: (entries?: IntersectionObserverEntry[]) => void;
  children: React.ReactNode;
}

export default function ContentBox({ handleIntersection, children }: Props) {
  useEffect(() => {
    const intersectionObserverOptions = {
      root: document.querySelector("#_viewbox"),
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      intersectionObserverOptions
    );

    const target = document.querySelector("#_landing");
    observer.observe(target);
  }, []);

  return (
    <div id="_viewbox" className="_container z-index-10">
      {children}
      <style jsx>{`
        ._container {
          height: 98vh;
          width: 82vw;

          display: flex;
          flex-direction: column;
          gap: 50px;

          margin: 10px;
          overflow: hidden;
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        ._container::-webkit-scrollbar {
          /* WebKit */
          width: 0;
          height: 0;
        }
        @media only screen and (max-width: 780px) {
          ._container {
            width: 90vw;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
