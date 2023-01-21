import React from "react";
import BlogPostCard from "../cards/BlogPost";

export default function BlogPost() {
  let width = 379;

  return (
    <div className="_section" id="_blogpost">
      <BlogPostCard width={width} />
      <BlogPostCard width={width} />
      <BlogPostCard width={width} />
    </div>
  );
}
