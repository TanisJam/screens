import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '@/store/root/config.store';
import { Display } from '@/models/display.model';

export interface DisplaysState {
  data: Display[];
  loading: boolean;
  error: string;
}

const initialState: DisplaysState = {
  data: [],
  loading: false,
  error: '',
};

export const displaySlice = createSlice({
  name: 'displays',
  initialState,
  reducers: {
    fetchDisplaysIsLoading: (state) => {
      state.loading = true;
    },
    fetchDisplaysSuccess: (state, action: PayloadAction<Display[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchDisplaysError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const displaysActions = {
  fetchDisplays: createAction(`${displaySlice.name}`),
  fetchDisplaysIsLoading: displaySlice.actions.fetchDisplaysIsLoading,
  fetchDisplaysSuccess: displaySlice.actions.fetchDisplaysSuccess,
  fetchDisplaysError: displaySlice.actions.fetchDisplaysError,
};

export const selectDisplays = (state: RootState) => state.displays.data;
export const selectDisplaysLoading = (state: RootState) =>
  state.displays.loading;
export const selectDisplaysError = (state: RootState) => state.displays.error;

export default displaySlice.reducer;
