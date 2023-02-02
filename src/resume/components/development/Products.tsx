import React from "react";
import { Section } from "./Section";
import { Card } from "../Card";
import { useDev } from "../../hooks/use_site_context";
import { nanoid } from "nanoid";
import card_styles from "./Card.module.css";
import styles from "./Products.module.css";

const Products = () => {
  const { products } = useDev();

  return (
    <Section title="Products">
      {products.map((product) => {
        const header = (
          <>
            <div>{product.title}</div>
            <span>
              <a href={product.url.demo}>Demo</a>
              {" | "}
              <a href={product.url.github}>Code</a>
            </span>
          </>
        );
        const subtitle = product.language;
        return (
          <Card
            key={nanoid()}
            header={header}
            subtitle={subtitle}
            content={product.description}
            classes={{
              header: [card_styles.header, styles.card_header],
              subtitle: [card_styles.subtitle],
              content: [card_styles.body],
            }}
          />
        );
      })}
    </Section>
  );
};

export { Products };
