import { all, fork } from 'redux-saga/effects';
import userSaga from './userSaga';
import postsSaga from './postsSaga';
import searchSaga from './searchSaga';
import leaderBoardSaga from './leaderBoardSaga';
import commentsSaga from './commentsSaga';
import notificationSaga from './notificationSaga';

function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postsSaga),
    fork(searchSaga),
    fork(leaderBoardSaga),
    fork(commentsSaga),
    fork(notificationSaga),
  ]);
}
export default rootSaga;