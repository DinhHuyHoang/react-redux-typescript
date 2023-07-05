import type { SagaError } from '@root/typings/types';
import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getUsers,
  getUsersSucceeded,
  getUsersFailed,
  getUser,
  getUserSucceeded,
  getUserFailed,
} from '../slices/user.slice';
import UserService from '../../services/user.service';

function* fetchUsers(action: PayloadAction<unknown>): Generator<unknown, void, unknown> {
  try {
    const service = new UserService();
    const data = yield call([service, service.getAll]);

    yield put({ type: getUsersSucceeded.type, payload: data });
  } catch (error: any) {
    console.log('saga::fetchUsers::', error.message);
    yield put<{ type: string; payload: SagaError }>({ type: getUsersFailed.type, payload: { message: error.message } });
  }
}

function* fetchUser(action: PayloadAction<{ id: number }>): Generator<unknown, void, unknown> {
  try {
    const { payload } = action;
    const service = new UserService();
    const data = yield call([service, service.getById], { id: payload.id });
    console.log({ data });
    yield put({ type: getUserSucceeded.type, payload: data });
  } catch (error: any) {
    console.log('saga::fetchUsers::', error.message);
    yield put<{ type: string; payload: SagaError }>({ type: getUserFailed.type, payload: { message: error.message } });
  }
}

export default function* watchAsync() {
  yield takeLatest(getUsers.type, fetchUsers);
  yield takeLatest(getUser.type, fetchUser);
}
