import { createContext, useContext } from "react";

export const WidthContext = createContext<{ width: number }>({ width: 0 });

export function WidthProvider(props: {
  width: number;
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <WidthContext.Provider value={{ width: props.width }}>
      {props.children}
    </WidthContext.Provider>
  );
}

export const useWidth = () => {
  const ctx = useContext(WidthContext);
  if (!ctx) {
    throw new Error("UseWidth must be used inside of a WidthProvider");
  }
  return ctx;
};
