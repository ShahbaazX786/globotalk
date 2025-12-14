import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: "forest",
      setCurrentTheme: (theme) => set({ currentTheme: theme }),
    }),
    { name: "globotalk-theme" }
  )
);
