import React from "react";
import { PRODUCTS } from "../../../../public/portfolio.data";
import ProductCard from "../cards/Product";

export default function Product() {
  let width = 379;

  return (
    <div className="_section" id="_product">
      {PRODUCTS.map((p) => (
        <ProductCard
          title={p.TITLE}
          description={p.CONTENT}
          links={p.LINKS}
          techStack={p.STACK}
          width={width}
        />
      ))}
    </div>
  );
}
