import React from "react";
import ProductCard from "../cards/Product";

export default function Product() {
  const links = { code: "", demo: "" };
  let width = 379;

  return (
    <div className="_section" id="_product">
      <ProductCard links={links} width={width} />
      <ProductCard links={links} width={width} />
    </div>
  );
}
