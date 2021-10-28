import { call, put, takeEvery, fork, take } from 'redux-saga/effects';
import { TasksActionTypes } from './sagaActions';
import { PayloadAction } from '@reduxjs/toolkit';
import { TaskSliceActions } from './tasksSlice';
import tasksApi from './tasksApi';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ROUTES } from '../../app/constants/routes';

export function* loadTaskList(action?: PayloadAction<number>) {
  yield put(TaskSliceActions.setLoadingState(true));

  const response = yield call(
    [tasksApi, tasksApi.getTasks],
    action?.payload || 1
  );

  if (response.status === 'ok') {
    yield put(TaskSliceActions.setTasks(response.message));
  } else {
    yield put(TaskSliceActions.setError(response.message));
  }
  try {
  } catch (e) {
    yield put(TaskSliceActions.setError(e.message));
  } finally {
    yield put(TaskSliceActions.setLoadingState(false));
  }
}

export function* initialTasksWatcher() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);

    if (action.payload.location.pathname === ROUTES.home) {
      yield fork(loadTaskList);
    }
  }
}

export function* tasksWatcher() {
  yield takeEvery(TasksActionTypes.LoadTasks, loadTaskList);
}

export function* tasksSaga() {
  yield fork(initialTasksWatcher);
  yield fork(tasksWatcher);
}
