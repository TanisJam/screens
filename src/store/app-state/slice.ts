import { Display } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isModalOpen: boolean;
  selectedDisplay: Display | null;
}

const initialState: AppState = {
  isModalOpen: false,
  selectedDisplay: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setSelectedDisplay: (state, action: PayloadAction<Display | null>) => {
      state.selectedDisplay = action.payload;
    },
  },
});

export const { openModal, closeModal, setSelectedDisplay } = appSlice.actions;

export const selectIsModalOpen = (state: AppState) => state.isModalOpen;
export const selectSelectedDisplay = (state: AppState) => state.selectedDisplay;

export default appSlice.reducer;
