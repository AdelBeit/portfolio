import { create } from "zustand";

interface WidthStore {
  width: number;
  setWidth(width: WidthStore["width"]): void;
}

export const useWidth = create<WidthStore>()((set) => ({
  width: 0,
  setWidth: (width) => set({ width }),
}));
