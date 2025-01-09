import { useAppDispatch, useAppSelector } from '@/store/root/hooks';
import {
  setSelectedDisplay,
  closeModal,
  openModal,
} from '@/store/app-state/slice';

import { DisplayItem } from '@/models';
import { useDisplays } from '@/hooks';

export const useAppState = () => {
  const dispatch = useAppDispatch();
  const { displays, fetchDisplayById } = useDisplays();

  const selectedDisplay = useAppSelector(
    (state) => state.appState.selectedDisplay
  );
  const isModalOpen = useAppSelector((state) => state.appState.isModalOpen);

  const addDisplay = async (displayId: DisplayItem['id'] | null) => {
    if (!displayId) {
      dispatch(setSelectedDisplay(null));
      return;
    }
    const existingDisplay = displays.find((d) => d.id === displayId);

    if (existingDisplay) {
      dispatch(setSelectedDisplay(existingDisplay));
    } else {
      try {
        await fetchDisplayById(displayId);
        const existingDisplay = displays.find((d) => d.id === displayId);
        if (existingDisplay) {
          dispatch(setSelectedDisplay(existingDisplay));
        }
      } catch (error) {
        console.error('Error fetching display by id:', error);
      }
    }
  };

  const toggleModal = () => {
    if (isModalOpen) {
      dispatch(closeModal());
    } else {
      dispatch(openModal());
    }
  };

  return {
    toggleModal,
    isModalOpen,
    selectedDisplay,
    addDisplay,
  };
};
