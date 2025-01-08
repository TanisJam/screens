import { type SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { getDisplays } from '@/services';
import {
  type DisplaySearchResponse,
  FetchDisplaysPayload,
} from '@/models/display.model';
import { displaysActions } from '@/store/displays/slice';
import { PayloadAction } from '@reduxjs/toolkit';

export function* onGetDisplays(
  action: PayloadAction<FetchDisplaysPayload>
): SagaIterator {
  try {
    const response: DisplaySearchResponse = yield call(
      getDisplays,
      action.payload.params,
      action.payload.controller.signal
    );
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
