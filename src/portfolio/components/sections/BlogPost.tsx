import React from "react";
import { BLOGPOSTS } from "../../../data/portfolio.data";
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
        <BlogPostCard
          key={_index}
          title={p.TITLE}
          link={p.LINK}
          width={width}
        />
      ))}
    </div>
  );
}
