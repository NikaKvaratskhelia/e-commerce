import { create } from "zustand";

type ProductStore = {
  selectedColorIndex: number;
  setSelectedColor: (color: number) => void;
};

export const useColorStore = create<ProductStore>((set) => ({
  selectedColorIndex: 0,
  setSelectedColor: (color) => set({ selectedColorIndex: color }),
}));
