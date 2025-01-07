import { all, fork } from 'redux-saga/effects';

import displaysWatcherSaga from '@/store/displays/saga';

export function* rootSaga() {
  yield all([fork(displaysWatcherSaga)]);
}

export default rootSaga;
