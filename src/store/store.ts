import { createWithEqualityFn } from 'zustand/traditional';

export type State = {
  themeId: 'light' | 'dark';
  setThemeId: (themeId: 'light' | 'dark') => void;
};

const useMainStore = createWithEqualityFn<State>((set) => ({
  themeId: 'dark',
  setThemeId: (themeId: 'light' | 'dark') =>
    set({
      themeId,
    }),
}));

export default useMainStore;
