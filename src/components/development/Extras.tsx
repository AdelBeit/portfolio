import React from "react";
import { useDev } from "../../hooks/use_site_context";
import { Card } from "../Card";
import { Section } from "./Section";

function Extras() {
  const { achievements, site, linkedin } = useDev();
  const links = (
    <>
      {/* <span>
        <a href={"https://" + site}>{site}</a>
      </span>
      {"; "} */}
      <span>
        <a href={"https://" + linkedin}>{linkedin}</a>
      </span>
    </>
  );
  return (
    <>
      <Section title="Awards">
        <Card content={[achievements.award]} />
      </Section>
      <Section title="Links">
        <Card content={[links]} />
      </Section>
    </>
  );
}

export { Extras };
