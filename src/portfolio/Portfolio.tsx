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
import IconEther, { etherIcons } from "./components/IconEther";
import preLoadImages from "./utils/preLoadImages";
import Landing from "./components/sections/Landing";
import { LANDING } from "../../public/portfolio.data";

/*
css cyberpunk buttons https://codepen.io/jh3y/full/BajVmOg
glitch effect https://codemyui.com/horror-movie-like-glitch-effect/
duotone shape factory https://duotone.shapefactory.co/?f=000000&t=0b9c00&q=night%20sky

*/

// TODO: restructure folders, move portfolio to top level, resume to a folder
// TODO: add video/pic demos for products
// TODO: download all icons from simpleicons, cleanup icons store
// TODO: animate keyword changes with a glitch effect
// TODO: add music, and music controls
// TODO: passive scrolling on product icons
// TODO: determine blogpost hosting, probably dev.to or medium
// TODO: add blog posts
// optional
// TODO: custom scrolling, view one section at a time, and scroll snapping to sections
// TODO: scrolling glitch effect
// TODO: change card sizes for tablet and phone screens, tablet should have 2 cards, phone should have bigger card
// TODO: intersection observer for changing highlighted nav button after scrolling to a different section

export function App() {
  const [width, setWidth] = useState(0);
  const [isLandingView, setIsLandingView] = useState(true);

  const resizeHandler = () => {
    let newWidth = 20 + window.innerWidth / 4;
    setWidth(window.innerWidth);
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsLandingView(true);
      } else {
        setIsLandingView(false);
      }
    });
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

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
    preLoadImages(etherIcons, "EtherIconsLoaded");
  }, []);

  return (
    <div className="_container relative">
      <IconEther />
      {/* <div id="_background_blur" className="blurred-background absolute"></div> */}
      <ContentBox handleIntersection={handleIntersection}>
        <Landing
          title={LANDING.NAME}
          role={LANDING.ROLE}
          description={LANDING.EXTRAS}
          keywords={LANDING.KEYWORDS}
        />
        <About width={width} />
        <Product />
        <BlogPost />
        <Experience />
      </ContentBox>
      <NavBox showLanding={isLandingView} />
      <style jsx>{`
        ._container {
          height: 100%;
          width: 100%;
          color: var(--green);
          background-color: var(--black);

          padding: 0;
          margin: 0;

          font-family: Roboto;
          font-weight: bold;

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

        #_background_blur {
          z-index: 50;
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
        p {
          white-space: pre-line;
        }

        ._contentBox {
          display: flex;
        }

        #_about,
        #_products,
        #_blogpost,
        #_experience {
          flex-direction: row;
          gap: 20px;
        }
        @media only screen and (max-width: 1100px) {
          #_about,
          #_product,
          #_blogpost,
          #_experience {
            flex-direction: column;
            align-items: center;
            gap: 80px;
          }
          #_about > div {
            gap: 80px;
          }
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
