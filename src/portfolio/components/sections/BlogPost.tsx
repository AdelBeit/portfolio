import React from "react";
import {BLOGPOSTS} from "../../../data/portfolio.data";
import {useWidth} from "../../store/WidthStore";
import BlogPostCard from "../cards/BlogPost";

export default function BlogPost() {
  let width = 379;
  const windowWidth = useWidth().width;
  if (windowWidth <= 480) {
    width = windowWidth - 100;
  }

  return (
    <div className="_section" id="_blogpost">
      {BLOGPOSTS.map((p, _index) => (
        <div key={p.TITLE} className="_card _container">
          <BlogPostCard
            key={_index}
            title={p.TITLE}
            link={p.LINK}
            width={width}
          />
        </div>
      ))}
      <style jsx>
        {`
          ._section#_blogpost {
            flex-flow: row wrap;
            justify-content: flex-start;
            align-self: center;
            width: ${windowWidth > (width + 100) * 2.6 ? "100%" : "0%"};
          }
          ._card._container {
            width: 49%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </div>
  );
}
