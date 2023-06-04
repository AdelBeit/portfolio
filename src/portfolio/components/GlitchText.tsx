import {useEffect, useRef, useState} from "react";

interface Props {
  text: string[];
  link?: string;
}

export default function GlitchText({text, link = ""}: Props) {
  const [index, setIndex] = useState<number>(0);
  const ref = useRef<null | HTMLDivElement>(null);
  const nextWordDelay = 2500;

  if (text[index].toLowerCase().includes("feed your pets")) {
    link = "https://github.com/AdelBeit/PETFEEDER";
  }

  const blink = (element: HTMLDivElement) => {
    element.style.opacity = "0";
    const timeout = setTimeout(() => {
      element.style.opacity = "1";
      clearTimeout(timeout);
    }, 50);
  };

  useEffect(() => {
    if (!ref.current) return;

    const target = ref.current;
    const nextWordTimeout = setTimeout(() => {
      blink(target);
      setIndex((prev) => {
        prev += 1;
        if (prev >= text.length) prev = 0;
        return prev;
      });
    }, nextWordDelay);

    return () => {
      clearTimeout(nextWordTimeout);
    };
  }, [ref.current, index]);

  return (
    <span className="_container _CG_container">
      <div
        ref={ref}
        className="_word _CG_word _CG_layer _CG_glitch"
        data-text={text[index]}>
        <span>
          {link !== "" ? (
            <a href={link} target="_blank">
              {text[index]}
            </a>
          ) : (
            text[index]
          )}
        </span>
      </div>
      <style jsx>
        {`
          a,
          a:visited,
          a:hover {
            color: inherit;
            cursor: pointer;
          }

          a:focus,
          a:hover {
            text-decoration: none;
          }
        `}
      </style>
    </span>
  );
}
