import React from "react";
import { BLOGPOSTS } from "../../../../public/portfolio.data";
import { BaseSectionProps } from "../../types";
import BlogPostCard from "../cards/BlogPost";

interface Props extends BaseSectionProps {}

export default function BlogPost({}: Props) {
  let width = 379;

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
