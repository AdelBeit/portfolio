import cs from "classnames";
import { useEffect, useRef } from "react";
import Typer from "../utils/Typer";

type cbOptionalArgs = { target?: HTMLSpanElement; typer?: Typer };

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

    const target: HTMLSpanElement = ref.current;
    const parent = target.parentElement;
    const typer = new Typer(target, content);

    const handleIntersection = (entries) => {
      return entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            parent.scrollBy(0, target.scrollHeight);
          }, 300);
          typer.start().then((res) => {
            clearInterval(interval);
            cb.call(this, { target: target, typer: typer });
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
    observer.observe(target);

    return () => {
      typer.stop();
      observer.disconnect();
    };
  }, [ref.current]);

  return <span ref={ref} className={cs(extraStyles)}></span>;
}
