import { create } from "zustand";

interface WidthStore {
  width: number;
  setWidth(width: WidthStore["width"]): void;
}

export const useWidth = create<WidthStore>()((set) => ({
  width: 0,
  setWidth: (width) => set({ width }),
}));

// const WidthContext = createContext<WidthStore>({ width: 0 });

// export function WidthProvider({
//   children,
//   width,
// }: {
//   children: ReactNode;
// } & WidthStore) {
//   return (
//     <WidthContext.Provider value={{ width: width }}>
//       {children}
//     </WidthContext.Provider>
//   );
// }

// export const useWidth = () => {
//   const ctx = useContext(WidthContext);
//   if (!ctx) {
//     throw new Error("UseWidth must be used inside of a WidthProvider");
//   }
//   return ctx;
// };
