import React, { useEffect, useState } from "react";
import About from "./components/sections/About";
import ContentBox from "./components/ContentBox";
import NavBox from "./components/NavBaguette";
import setActiveNavButton from "./utils/setActiveNavButton";
import { scrollHandler } from "./utils/scrollHandler";
import Product from "./components/sections/Product";
import BlogPost from "./components/sections/BlogPost";
import Experience from "./components/sections/Experience";
import inlineSVG from "./utils/inlineSVG";
import IconEther, { etherIcons } from "./components/IconEther";
import preLoadImages from "./utils/preLoadImages";
import Landing from "./components/sections/Landing";
import { LANDING } from "../../public/portfolio.data";
import { SECTIONS } from "./types";
import { useWidth } from "./store/WidthStore";
import Layout from "./Layout";

/*
css cyberpunk buttons https://codepen.io/jh3y/full/BajVmOg
glitch effect https://codemyui.com/horror-movie-like-glitch-effect/
duotone shape factory https://duotone.shapefactory.co/?f=000000&t=0b9c00&q=night%20sky
*/

// TODO: fix all links to external sites 'linkedin','github','resume',etc...
// TODO: add music, and music controls
// TODO: determine blogpost hosting, probably dev.to or medium
// TODO: add blog posts
// TODO: favicon, title
// optional
// TODO: custom scrolling, view one section at a time, and scroll snapping to sections
// TODO: scrolling glitch effect
// TODO: change card sizes for tablet and phone screens, tablet should have 2 cards, phone should have bigger card
// TODO: add a footer to view source code for portfolio on github
// TODO: make icon ether svg icons glitch in and out of existence at random spots
// TODO: use css clamp() for responsive font sizes
// TODO: download all icons from simpleicons, cleanup icons store
// TODO: make the background shake to the beat

export function App() {
  const { setWidth } = useWidth();
  const [currentSection, setCurrentSection] = useState("_landing");

  const resizeHandler = () => {
    setWidth(window.innerWidth);
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((section) => {
      if (section.isIntersecting) {
        setCurrentSection(section.target.id);
      }
    });
  };

  useEffect(() => {
    setActiveNavButton(currentSection as unknown as SECTIONS);
  }, [currentSection]);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("wheel", scrollHandler, { passive: false });
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("wheel", scrollHandler);
    };
  }, []);

  useEffect(() => {
    preLoadImages(etherIcons, "EtherIconsLoaded");
  }, []);

  return (
    <Layout>
      <div className="_container relative">
        <IconEther />
        <ContentBox handleIntersection={handleIntersection}>
          <Landing
            title={LANDING.NAME}
            role={LANDING.ROLE}
            description={LANDING.CONTENT}
            keywords={LANDING.KEYWORDS}
            isInView={currentSection === "_landing"}
          />
          <About isInView={currentSection === "_about"} />
          <Product isInView={currentSection === "_product"} />
          {/* <BlogPost isInView={currentSection === "_blogpost"} /> */}
          <Experience isInView={currentSection === "_experience"} />
        </ContentBox>
        <NavBox showLanding={currentSection === "_landing"} />
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
    </Layout>
  );
}
