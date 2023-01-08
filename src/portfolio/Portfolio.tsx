import React, { useState } from "react";
import About from "./components/sections/About";
import ContentBox from "./components/ContentBox";
import NavBox from "./components/NavBagguette";
import Frame from "./components/IconFrame";

const black = "#282828";
const green = "#33FF00";
const yellow = "#FFB000";

const _styles = {
  width: "100%",
  height: "100%",
  color: yellow,
  backgroundColor: black,
};

export function App() {
  const [width, setWidth] = useState(379);

  return (
    <div className="_container relative highlight" style={_styles}>
      {/* <input
         className="inline-block"
         id="width"
         type="range"
         min="379"
         max="1000"
         value={width}
         onChange={(e) => setWidth(parseInt(e.target.value))}
       />
       <p className="inline-block">w: {width}</p> */}
      {/* <About width={width} /> */}
      <ContentBox>
        {/* <p> buttons </p>
        <br />
        <Frame _type="button" icon="github" />
        <br />
        <Frame _type="button" shadow={true} icon="github" />
        <br />
        <p> icons </p>
        <br />
        <Frame _type="icon" border={false} icon="github" />
        <br />
        <Frame _type="icon" icon="github" /> */}
        <About />
        <About />
      </ContentBox>
      <NavBox>
        <p>nav</p>
      </NavBox>

      <style jsx>{`
        ._container {
          height: 100%;
          overflow: scroll;
          //   display: flex;
          //   flex-direction: row;
          //   justify-content: space-between;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        ._container::-webkit-scrollbar {
          /* WebKit */
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
}
