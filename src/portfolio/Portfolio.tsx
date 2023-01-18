import React, { createContext, useEffect, useState } from "react";
import About from "./components/sections/About";
import ContentBox from "./components/ContentBox";
import NavBox from "./components/NavBaguette";
import Frame from "./components/Frame";
import { markActive } from "./utils/markActive";

const black = "#282828";
const green = "#33FF00";
const yellow = "#FFB000";

const _styles = {
  width: "100%",
  height: "100%",
  color: green,
  backgroundColor: black,
};

export function App() {
  const [width, setWidth] = useState(379);
  const [isLandingView, setIsLandingView] = useState(true);

  // TODO: handle scroll on touch devices
  const handleScroll = (e) => {
    e.preventDefault();
    document.querySelector("#_viewbox").scrollBy(0, e.deltaY);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });

    document.querySelector("#_navbar").addEventListener("click", markActive);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      document
        .querySelector("#_navbar")
        .removeEventListener("click", markActive);
    };
  }, []);

  return (
    <div className="_container relative" style={_styles}>
      <ContentBox>
        <About />
        <About />
        <About />
        <About />
      </ContentBox>
      <NavBox showLanding={isLandingView} />

      <style jsx>{`
        ._container {
          height: 100%;

          overflow: hidden;
          display: flex;
          justify-content: space-between;
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
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
