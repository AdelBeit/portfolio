import React from "react";
import { PRODUCTS } from "../../../data/portfolio.data";
import { useWidth } from "../../store/WidthStore";
import { BaseSectionProps } from "../../types";
import ProductCard from "../cards/Product";

interface Props extends BaseSectionProps { }

export default function Product({ }: Props) {
  let width = 379;
  const windowWidth = useWidth().width;
  if (windowWidth <= 480) {
    width = windowWidth - 100;
  }

  return (
    <div className="_section" id="_products">
      {PRODUCTS.map((p) => (
        <div key={p.TITLE} className="_card _container">
          <ProductCard
            title={p.TITLE}
            description={p.CONTENT}
            links={p.LINKS}
            techStack={p.STACK}
            width={width}
          />
        </div>
      ))}
      <style jsx>
        {`
        ._section#_products{  
          flex-flow: row wrap;
          justify-content: flex-start;
          align-self:center;
          width:${windowWidth > (width + 100) * 2.6 ? "100%" : "0%"};
        }
        ._card._container{
          width: 49%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding:0;
          margin:0;
        }
        `}
      </style>
    </div>
  );
}
