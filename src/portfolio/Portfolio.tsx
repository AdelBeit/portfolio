import React, {useEffect} from "react";
import About from "./components/sections/About";
import ContentBox from "./components/ContentBox";
import {NavBaguette as NavBox} from "./components/NavBaguette";
import {scrollHandler} from "./utils/scrollHandler";
import Product from "./components/sections/Product";
import BlogPost from "./components/sections/BlogPost";
import Experience from "./components/sections/Experience";
import {ETHERICONS} from "../data/portfolio.data";
import {IconEther} from "react-icon-ether";
import Landing from "./components/sections/Landing";
import {LANDING, SONGS} from "../data/portfolio.data";
import Layout from "./Layout";
import Sound from "react-sound";
import {useMusic} from "./store/MusicStore";
import {Providers} from "./Providers";

/*
css cyberpunk buttons https://codepen.io/jh3y/full/BajVmOg
glitch effect https://codemyui.com/horror-movie-like-glitch-effect/
duotone shape factory https://duotone.shapefactory.co/?f=000000&t=0b9c00&q=night%20sky
*/

// TODO: update how navbar active changes, and observer code
// TODO: make demos for projects, add them
// TODO: product card revision, make demo show first, flip to see info
// TODO: cloud ether doesn't show on firefox
// TODO: add warning for music
// TODO: add a contact button in navbaguette that shows contact info so its always available
// TODO: determine blogpost hosting, probably dev.to or medium
// TODO: add blog posts
// TODO: add a footer to view source code for portfolio on github
// optional
// TODO: make ether cloud blur and move in the direction of scroll
// TODO: make the navbar change more visible, maybe glitch effect
// TODO: custom scrolling, view one section at a time, and scroll snapping to sections
// TODO: scrolling glitch effect
// TODO: make icon ether svg icons glitch in and out of existence at random spots
// TODO: make the background react to the beat
// TODO: add background blur for music
// TODO: animate title to type with js, static on page blur
// bugs:
// TODO: navbar change broken

export function App() {
  const player = useMusic((state) => ({
    songs: state.songs,
    songIndex: state.songIndex,
    playing: state.playing,
    next: state.next,
  }));

  useEffect(() => {
    window.addEventListener("wheel", scrollHandler, {passive: false});
    return () => {
      window.removeEventListener("wheel", scrollHandler);
    };
  }, []);

  return (
    <Layout>
      <div id="ether_container" className="_container relative">
        <IconEther icons={ETHERICONS} localPath="/svgs/icons/static/" />
        <Providers>
          <ContentBox>
            <Landing
              title={LANDING.NAME}
              role={LANDING.ROLE}
              description={LANDING.CONTENT}
              keywords={LANDING.KEYWORDS}
            />
            <Product />
            <About />
            <BlogPost  />
            {/* <Experience  /> */}
          </ContentBox>
          <NavBox />
        </Providers>
        <Sound
          url={"/mp3/" + player.songs[player.songIndex]}
          playStatus={
            (player.playing && Sound.status.PLAYING) || Sound.status.PAUSED
          }
          volume={20}
          onFinishedPlaying={player.next}
        />
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
            row-gap: 50px;
          }
          @media only screen and (max-width: 1100px) {
            #_about,
            #_products,
            #_blogpost,
            #_experience {
              flex-direction: column;
              align-items: center;
              gap: 80px;
              row-gap: 80px;
            }
            #_about > div {
              gap: 80px;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}
