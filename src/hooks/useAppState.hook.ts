import { useAppDispatch, useAppSelector } from '@/store/root/hooks';
import { setSelectedDisplay } from '@/store/app-state/slice';
import { DisplayItem } from '@/models';
import { useDisplays } from '@/hooks';

export const useAppState = () => {
  const dispatch = useAppDispatch();
  const { displays } = useDisplays();
  const selectedDisplay = useAppSelector(
    (state) => state.appState.selectedDisplay
  );

  const addDisplay = (display: DisplayItem | null) => {
    if (!display) {
      dispatch(setSelectedDisplay(null));
      return;
    }

    const existingDisplay = displays.find((d) => d.id === display.id);
    if (existingDisplay) {
      dispatch(setSelectedDisplay(existingDisplay));
    }
  };

  return {
    selectedDisplay,
    addDisplay,
  };
};
