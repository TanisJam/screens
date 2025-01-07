import { type Action, combineReducers } from '@reduxjs/toolkit';
import displaysReducer from '@/store/displays/slice';

const appReducer = combineReducers({
  displays: displaysReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: Action
) => {
  return appReducer(state, action);
};

export default rootReducer;
