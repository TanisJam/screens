import { type SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { getDisplays } from '@/services/api.service';
import { type DisplaySearchResponse } from '@/models/display.model';
import { displaysActions } from '@/store/displays/slice';

export function* onGetDisplays(): SagaIterator {
  try {
    const params = {
      date_from: '2024-12-23',
      date_to: '2024-12-29',
    };
    const response: DisplaySearchResponse = yield call(getDisplays, params);
    yield put(displaysActions.fetchDisplaysSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(displaysActions.fetchDisplaysError(error.message));
    }
  }
}

function* displaysWatcherSaga(): SagaIterator {
  yield takeEvery(displaysActions.fetchDisplays.type, onGetDisplays);
}

export default displaysWatcherSaga;
