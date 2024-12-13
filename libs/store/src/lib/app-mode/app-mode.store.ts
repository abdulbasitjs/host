import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppModeState } from '../typings';

export const useAppModeStore = create<AppModeState>()(
  persist(
    (set) => ({
      isStandalone: false,
      setStandalone: (value) => set({ isStandalone: value }),
    }),
    {
      name: 'app-mode-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isStandalone: state.isStandalone }),
    },
  ),
);
