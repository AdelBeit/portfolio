import {useEffect, useRef, useState} from "react";

function useSectionObserver() {
  const observer = useRef<IntersectionObserver>();
  const [activeSection, setActiveSection] = useState("_landing");

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: document.querySelector("#_viewbox"),
      rootMargin: "0px",
      threshold: 0.1,
    });

    const sections = document.querySelectorAll("._section");
    sections.forEach((section) => observer.current.observe(section));

    return () => observer.current?.disconnect();
  }, []);

  return {activeSection};
}

export {useSectionObserver};
