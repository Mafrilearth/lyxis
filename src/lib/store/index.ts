import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CBTStoreState {
  isInitialized: boolean;
  setInitialized: (val: boolean) => void;
}

export const useCBTStore = create<CBTStoreState>()(
  persist(
    (set) => ({
      isInitialized: true,
      setInitialized: (val) => set({ isInitialized: val }),
    }),
    {
      name: "lyxis_cbt_store",
    },
  ),
);
