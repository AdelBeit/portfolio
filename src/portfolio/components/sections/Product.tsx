import React from "react";
import { PRODUCTS } from "../../../../public/portfolio.data";
import { useWidth } from "../../context/WidthContext";
import { BaseSectionProps } from "../../types";
import ProductCard from "../cards/Product";

interface Props extends BaseSectionProps {}

export default function Product({}: Props) {
  let width = 379;
  const { width: windowWidth } = useWidth();
  if (windowWidth <= 480) {
    width = windowWidth - 100;
  }

  return (
    <div className="_section" id="_product">
      {PRODUCTS.map((p, _index) => (
        <ProductCard
          key={_index}
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
