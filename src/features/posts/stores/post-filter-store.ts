import { create } from "zustand";

type PostFilterState = {
  query: string;
  setQuery: (value: string) => void;
};

export const usePostFilterStore = create<PostFilterState>((set) => ({
  query: "",
  setQuery: (value) => set({ query: value })
}));
