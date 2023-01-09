import React from "react";
import AboutCard from "../cards/About";
import EducationCard from "../cards/Education";
import TechStackCard from "../cards/TechStack";
import ExperienceCard from "../cards/Experience";
import ProductCard from "../cards/Product";
import BlogPostCard from "../cards/BlogPost";

export default function About() {
  return (
    <div className="_section">
      {/* <EducationCard width={352} /> */}
      {/* <TechStackCard width={352} /> */}
      {/* <TechStackCard width={352} /> */}
      {/* <ExperienceCard width={352} /> */}
      <ProductCard width={352} />
      <ProductCard width={352} />
      {/* <BlogPostCard width={379} /> */}
      <style jsx>{`
        ._section {
          height: 100%;
          height: fit-content;
          width: 100%;
          display: flex;
          justify-content: space-around;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
