import { all, spawn, call } from 'redux-saga/effects';
import { authWatcher } from '../features/auth/authSaga';
import { tasksSaga } from '../features/tasks/tasksSaga';

export function* rootSaga() {
  const sagas = [authWatcher, tasksSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      })
    )
  );
}
