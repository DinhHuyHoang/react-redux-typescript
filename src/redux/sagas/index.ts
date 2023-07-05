import { all, fork } from 'redux-saga/effects';
import userSaga from './user.saga';
import channelSaga from './channel.saga';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(channelSaga)]);
}
