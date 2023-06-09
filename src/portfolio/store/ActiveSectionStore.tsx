import {createContext, useContext, useEffect, useRef, useState} from "react";

type ActiveSectionType = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionType>({
  activeSection: "_landing",
  setActiveSection: () => {},
});

const ActiveSectionProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const {activeSection, setActiveSection} = useIntersectionObserver();
  return (
    <ActiveSectionContext.Provider value={{activeSection, setActiveSection}}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

const useActiveSection = () => useContext(ActiveSectionContext);

const useIntersectionObserver = (): ActiveSectionType => {
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

  return {activeSection, setActiveSection};
};

export {ActiveSectionProvider, useActiveSection};
