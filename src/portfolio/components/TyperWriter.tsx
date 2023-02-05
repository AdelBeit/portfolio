import cs from "classnames";
import { useEffect, useRef } from "react";
import Typer from "../utils/Typer";

type cbOptionalArgs = { parent?: HTMLSpanElement; typer?: Typer };

interface Props {
  content: string;
  extraStyles?: string;
  cb?: (args?: cbOptionalArgs) => void;
}

export function TypeWriter({
  content,
  extraStyles = "",
  cb = ({}) => {},
}: Props) {
  const ref = useRef<null | HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const parent = ref.current;
    const target: HTMLSpanElement = parent.querySelector("._insert_");
    const typer = new Typer(target, content);

    const handleIntersection = (entries) => {
      return entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typer.start().then((res) => {
            cb.call(this, { parent: parent, typer: typer });
          });
        }
      });
    };

    const options = {
      root: document.querySelector("#_viewbox"),
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(parent);

    return () => {
      typer.stop();
      observer.disconnect();
    };
  }, [ref.current]);

  return (
    <span ref={ref}>
      <span className={cs("_insert_", extraStyles)}></span>
    </span>
  );
}
