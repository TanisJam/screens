import { type Action, combineReducers } from '@reduxjs/toolkit';
import displaysReducer from '@/store/displays/slice';
import appStateReducer from '@/store/app-state/slice';

const appReducer = combineReducers({
  displays: displaysReducer,
  appState: appStateReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: Action
) => {
  return appReducer(state, action);
};

export default rootReducer;
