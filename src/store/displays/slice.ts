import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '@/store/root/config.store';
import {
  Display,
  FetchDisplaysPayload,
  GetDisplaysParams,
} from '@/models/display.model';

export interface DisplaysState {
  data: Display[];
  query: GetDisplaysParams;
  loading: boolean;
  error: string;
}

const initialState: DisplaysState = {
  data: [],
  query: {
    date_from: '',
    date_to: '',
    lat_sw: 0,
    lng_sw: 0,
    lat_ne: 0,
    lng_ne: 0,
  },
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
      if (!(action.payload === 'canceled')) {
        state.error = action.payload;
        state.loading = false;
      }
    },
    setQuery: (state, action: PayloadAction<GetDisplaysParams>) => {
      state.query = { ...state.query, ...action.payload };
    },
    resetQuery: (state) => {
      state.query = {
        ...state.query,
        search: undefined,
        location_type: undefined,
        size_type: undefined,
        price_min: undefined,
        price_max: undefined,
      };
    },
  },
});

export const displaysActions = {
  fetchDisplays: createAction<FetchDisplaysPayload>(`${displaySlice.name}`),
  fetchDisplaysIsLoading: displaySlice.actions.fetchDisplaysIsLoading,
  fetchDisplaysSuccess: displaySlice.actions.fetchDisplaysSuccess,
  fetchDisplaysError: displaySlice.actions.fetchDisplaysError,
  setQuery: displaySlice.actions.setQuery,
  resetQuery: displaySlice.actions.resetQuery,
};

export const selectDisplays = (state: RootState) => state.displays.data;
export const selectDisplaysLoading = (state: RootState) =>
  state.displays.loading;
export const selectDisplaysError = (state: RootState) => state.displays.error;
export const selectDisplaysQuery = (state: RootState) => state.displays.query;

export default displaySlice.reducer;
