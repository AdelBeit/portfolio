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
      typer.start();

      return () => typer.stop();
    }
  }, [ref.current]);
  return (
    <span ref={ref}>
      <span className="none _content_">{content}</span>
      <span className="_insert_"></span>
    </span>
  );
}
