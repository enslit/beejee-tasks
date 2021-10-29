import { call, put, takeEvery, fork, take, select } from 'redux-saga/effects';
import { TasksActionTypes } from './sagaActions';
import { PayloadAction } from '@reduxjs/toolkit';
import { TaskSliceActions } from './tasksSlice';
import tasksApi from './tasksApi';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ROUTES } from '../../app/constants/routes';
import { RootState } from '../../app/store';
import { Task } from './models/Task';
import { AddTaskRequestForm } from './models/AddTaskRequestForm';
import { AddTaskForm } from './models/AddTaskForm';
import { BeeJeeApi } from '../../utils/api/BeeJeeApi';

export function* changeTask(
  action: PayloadAction<{ type: 'complete' | 'edit'; id: number }>
) {
  yield put(TaskSliceActions.setLoadingState(true));

  try {
    const { auth, tasks }: RootState = yield select();
    const authToken = yield call([BeeJeeApi, BeeJeeApi.getAuthToken]);

    if (!authToken) {
      throw new Error('No auth token');
    }

    let response;

    if (action.payload.type === 'complete') {
      response = yield call(
        [tasksApi, tasksApi.complete],
        action.payload.id,
        !!auth.user?.isAdmin,
        authToken
      );
    } else {
      response = yield call(
        [tasksApi, tasksApi.change],
        action.payload.id,
        tasks.editedText,
        authToken
      );
    }

    if (response.status === 'ok') {
      if (action.payload.type === 'edit') {
        yield put(TaskSliceActions.setEditingTask(null));
      }
      yield call(loadTaskList);
    } else {
      throw new Error(response.message);
    }
  } catch (e) {
    yield put(TaskSliceActions.setError(e.message));
  } finally {
    yield put(TaskSliceActions.setLoadingState(false));
  }
}

export function* addTask() {
  yield put(TaskSliceActions.setLoadingState(true));

  try {
    const { tasks }: RootState = yield select();

    const formData: AddTaskRequestForm = {
      username: tasks.form.username.value,
      email: tasks.form.email.value,
      text: tasks.form.text.value,
    };

    const response = yield call([tasksApi, tasksApi.create], formData);

    if (response.status === 'ok') {
      yield put(TaskSliceActions.setVisibleForm(false));
      yield call(loadTaskList);
    } else {
      if (typeof response.message === 'object') {
        const errors: [keyof AddTaskForm, string][] = [];

        for (const field in response.message) {
          if (field in formData) {
            errors.push([
              field as keyof AddTaskForm,
              response.message[field] as string,
            ]);
          }
        }

        yield put(TaskSliceActions.setFieldsError(errors));
      } else {
        yield put(TaskSliceActions.setError(response.message));
      }
    }
  } catch (e) {
    yield put(TaskSliceActions.setError(e.message));
  } finally {
    yield put(TaskSliceActions.setLoadingState(false));
  }
}

export function* changePage(action: PayloadAction<number>) {
  yield put(TaskSliceActions.setPage(action.payload));
  yield fork(loadTaskList);
}

export function* changeSortField(action: PayloadAction<keyof Task>) {
  yield put(TaskSliceActions.setSortField(action.payload));
  yield fork(loadTaskList);
}

export function* changeSortDirection(action: PayloadAction<'asc' | 'desc'>) {
  yield put(TaskSliceActions.setSortDirection(action.payload));
  yield fork(loadTaskList);
}

export function* loadTaskList() {
  yield put(TaskSliceActions.setLoadingState(true));

  const { tasks }: RootState = yield select();

  const response = yield call(
    [tasksApi, tasksApi.getTasks],
    tasks.page,
    tasks.sort,
    tasks.sortDirection
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
  yield takeEvery(TasksActionTypes.ChangeTask, changeTask);
  yield takeEvery(TasksActionTypes.AddTask, addTask);
  yield takeEvery(TasksActionTypes.ChangePage, changePage);
  yield takeEvery(TasksActionTypes.ChangeSortField, changeSortField);
  yield takeEvery(TasksActionTypes.ChangeSortDirection, changeSortDirection);
}

export function* tasksSaga() {
  yield fork(initialTasksWatcher);
  yield fork(tasksWatcher);
}
