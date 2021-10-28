import { all } from 'redux-saga/effects';
import { authWatcher } from '../features/auth/authSaga';

export function* rootSaga() {
  yield all([authWatcher()]);
}
