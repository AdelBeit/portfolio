import React from "react";
import AboutCard from "../cards/About";
import EducationCard from "../cards/Education";
import TechStackCard from "../cards/TechStack";
import ExperienceCard from "../cards/Experience";
import ProductCard from "../cards/Product";
import BlogPostCard from "../cards/BlogPost";
import { linkHandler } from "../../lib/linkHandler";
import Baguette from "../Baguette";
import Frame from "../IconFrame";

export default function About() {
  const links = { code: "", demo: "" };
  const buttons = new Map([
    ["info", { clickHandler: linkHandler("") }],
    ["github", { clickHandler: linkHandler("") }],
    ["demo", { clickHandler: linkHandler("") }],
  ]);

  return (
    <div className="_section">
      {/* <Frame
        icon={"github"}
        _type={"button"}
        clickHandler={buttons.get("info").clickHandler}
      /> */}
      {/* <Baguette _type="button" crumbs={buttons} /> */}
      {/* <EducationCard width={352} /> */}
      {/* <TechStackCard width={352} /> */}
      {/* <TechStackCard width={352} /> */}
      {/* <ExperienceCard width={352} /> */}
      {/* <ProductCard links={links} width={352} /> */}
      {/* <ProductCard links={links} width={352} /> */}
      <BlogPostCard width={379} />
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
