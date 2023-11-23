import { shallow } from 'zustand/shallow';
import useMainStore from '../store';

export const useSelectThemeId = () => {
  const themeId = useMainStore((state) => state.themeId, shallow);

  return themeId;
};

export const useSelectSetThemeId = () => {
  const setThemeId = useMainStore((state) => state.setThemeId, shallow);

  return setThemeId;
};
