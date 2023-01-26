import React, { useEffect, useState } from "react";
import About from "./components/sections/About";
import ContentBox from "./components/ContentBox";
import NavBox from "./components/NavBaguette";
import { markActive } from "./utils/markActive";
import { scrollHandler } from "./utils/scrollHandler";
import Product from "./components/sections/Product";
import BlogPost from "./components/sections/BlogPost";
import Experience from "./components/sections/Experience";
import inlineSVG from "./utils/inlineSVG";
import IconEther from "./components/IconEther";
import preLoadImages from "./utils/preLoadImages";

const black = "#282828";
const green = "#33FF00";
const yellow = "#FFB000";

const _styles = {
  width: "100%",
  height: "100%",
  color: green,
  backgroundColor: black,
};

/*
css cyberpunk buttons https://codepen.io/jh3y/full/BajVmOg
glitch effect https://codemyui.com/horror-movie-like-glitch-effect/
duotone shape factory https://duotone.shapefactory.co/?f=000000&t=0b9c00&q=night%20sky

*/

// TODO: make landing page
// TODO: finish tech stack card with appropriate icons
// TODO: download all icons from simpleicons, cleanup icons store, move everything around, move resume around
// TODO: animate keyword changes with a glitch effect
// TODO: change font sizes for everything
// TODO: add music, and music controls
// TODO: passive scrolling on product icons
// TODO: set info as active after scrolling down from landing page
// TODO: determine blogpost hosting, probably dev.to or medium
// TODO: add blog posts
// optional
// TODO: custom scrolling, view one section at a time, and scroll snapping to sections
// TODO: scrolling glitch effect
// TODO: change card sizes for tablet and phone screens, tablet should have 2 cards, phone should have bigger card

export function App() {
  const [width, setWidth] = useState(30);
  const [isLandingView, setIsLandingView] = useState(false);

  const resizeHandler = () => {
    let newWidth = 20 + window.innerWidth / 4;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("wheel", scrollHandler, { passive: false });
    document.querySelector("#_navbar").addEventListener("click", markActive);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("wheel", scrollHandler);
      document
        .querySelector("#_navbar")
        .removeEventListener("click", markActive);
    };
  }, []);

  useEffect(() => {
    preLoadImages();
  }, []);

  return (
    <div className="_container relative" style={_styles}>
      <IconEther />
      <ContentBox>
        <About />
        <Product />
        <BlogPost />
        <Experience />
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
      <style jsx global>{`
        ._svg {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div
        className="hide"
        id="animated_inline_svg"
        dangerouslySetInnerHTML={{ __html: inlineSVG }}
      />
    </div>
  );
}
