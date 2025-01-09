import { type Action, combineReducers } from '@reduxjs/toolkit';
import displaysReducer from '@/store/displays/slice';
import appStateReducer from '@/store/app-state/slice';
import cartReducer from '@/store/cart/slice';

const appReducer = combineReducers({
  displays: displaysReducer,
  appState: appStateReducer,
  cart: cartReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: Action
) => {
  return appReducer(state, action);
};

export default rootReducer;
