import { useEffect, useRef } from "react";
import Typer from "../utils/Typer";

export function TypeWriter({ content }: { content: string }) {
  const ref = useRef<null | HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const parent = ref.current;
      const content = parent.querySelector("._content_").textContent;
      const target: HTMLSpanElement = parent.querySelector("._insert_");
      const typer = new Typer(target, content);

      const handleIntersection = (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) typer.start();
        });

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
    }
  }, [ref.current]);
  return (
    <span ref={ref}>
      <span className="none _content_">{content}</span>
      <span className="_insert_"></span>
    </span>
  );
}
