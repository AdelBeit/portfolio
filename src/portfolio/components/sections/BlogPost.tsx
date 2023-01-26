import React from "react";
import { BLOGPOSTS } from "../../../../public/portfolio.data";
import BlogPostCard from "../cards/BlogPost";

export default function BlogPost() {
  let width = 379;

  return (
    <div className="_section" id="_blogpost">
      {BLOGPOSTS.map((p) => (
        <BlogPostCard title={p.TITLE} link={p.LINK} width={width} />
      ))}
    </div>
  );
}
