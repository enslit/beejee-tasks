import { put, call, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceActions } from './authSlice';
import authApi from './authApi';
import { LoginForm } from './models/LoginForm';
import { AuthActionTypes } from './sagaActions';
import { Token } from './models/Token';
import { AppActions } from '../../app/appSlice';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../app/constants/app';

export function* initialAuth() {
  const tokedData = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  if (tokedData) {
    const jsonTokenData: Token = yield call([JSON, JSON.parse], tokedData);

    if (jsonTokenData.expiresDate > Date.now()) {
      yield put(AuthSliceActions.login({ isAdmin: true }));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      yield put(AppActions.setError('Token expired'));
    }
  }
}

export function* logout() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  yield put(AuthSliceActions.logout());
}

export function* login(action: PayloadAction<LoginForm>) {
  try {
    yield put(AuthSliceActions.setLoadingState(true));
    yield put(AuthSliceActions.setError(''));

    const response = yield call([authApi, authApi.login], action.payload);

    if (response.status === 'ok') {
      if (response?.message?.token) {
        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 1);

        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_KEY,
          JSON.stringify({
            token: response.message.token,
            expiresDate: expiresDate.getTime(),
          })
        );
      } else {
        throw new Error('No token in response');
      }

      yield put(AuthSliceActions.login({ isAdmin: true }));
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
  yield initialAuth();
  yield takeEvery(AuthActionTypes.Login, login);
  yield takeEvery(AuthActionTypes.Logout, logout);
}
