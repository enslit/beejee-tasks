import { put, call, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceActions } from './authSlice';
import authApi from './authApi';
import { LoginForm } from './models/LoginForm';
import { AuthActionTypes } from './sagaActions';

const localStorageTokenKey = 'beejee-token';

export function* logout() {
  localStorage.removeItem(localStorageTokenKey);
  yield put(AuthSliceActions.logout());
}

export function* login(action: PayloadAction<LoginForm>) {
  try {
    yield put(AuthSliceActions.setLoadingState(true));
    yield put(AuthSliceActions.setError(''));

    const response = yield call([authApi, authApi.login], action.payload);

    if (response.status === 'ok') {
      if (response?.message?.token) {
        localStorage.setItem(localStorageTokenKey, response.message.token);
      } else {
        throw new Error('No token in response');
      }

      yield put(
        AuthSliceActions.login({
          username: action.payload.username,
          isAdmin: true,
        })
      );
    } else {
      yield put(AuthSliceActions.setError(response.message));
    }
  } catch (e) {
    yield put(AuthSliceActions.setError(e.message));
  } finally {
    yield put(AuthSliceActions.setLoadingState(false));
  }
}

export function* authWatcher() {
  yield takeEvery(AuthActionTypes.Login, login);
  yield takeEvery(AuthActionTypes.Logout, logout);
}
