import React, {createContext, useContext, useEffect, useState} from "react";

type WidthType = {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
};

const WidthContext = createContext<WidthType>({width: 120, setWidth: () => {}});

const WidthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [width, setWidth] = useState(0);
  const resizeHandler = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <WidthContext.Provider value={{width, setWidth}}>
      {children}
    </WidthContext.Provider>
  );
};

const useWidth = () => useContext(WidthContext);

export {WidthContext, useWidth, WidthProvider};
