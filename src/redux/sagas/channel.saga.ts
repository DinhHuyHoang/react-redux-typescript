import type { SagaError } from '@root/typings/types';
import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getChannels,
  getChannelsSucceeded,
  getChannelsFailed,
  getChannel,
  getChannelSucceeded,
  getChannelFailed,
  uploadFiles,
  uploadFilesSucceeded,
  uploadFilesFailed,
} from '../slices/channel.slice';
import ChannelService from '../../services/channel.service';

function* fetchChannels(action: PayloadAction<unknown>): Generator<unknown, void, unknown> {
  try {
    const service = new ChannelService();
    const data = yield call([service, service.getAll]);

    yield put({ type: getChannelsSucceeded.type, payload: data });
  } catch (error: any) {
    console.log('saga::fetchChannels::', error.message);
    yield put<{ type: string; payload: SagaError }>({
      type: getChannelsFailed.type,
      payload: { message: error.message },
    });
  }
}

function* fetchChannel(action: PayloadAction<{ id: number }>): Generator<unknown, void, unknown> {
  try {
    const { payload } = action;
    const service = new ChannelService();
    const data = yield call([service, service.getById], { id: payload.id });

    yield put({ type: getChannelSucceeded.type, payload: data });
  } catch (error: any) {
    console.log('saga::fetchUsers::', error.message);
    yield put<{ type: string; payload: SagaError }>({
      type: getChannelFailed.type,
      payload: { message: error.message },
    });
  }
}

function* fetchUploadFiles(action: PayloadAction<{ id: string; files: FileList }>): Generator<unknown, void, unknown> {
  try {
    const { payload } = action;
    const service = new ChannelService();
    const data = yield call([service, service.uploadMultipleFiles], { id: payload.id, files: payload.files });

    yield put({ type: uploadFilesSucceeded.type, payload: data });
  } catch (error: any) {
    console.log('saga::fetchUploadFiles::', error.message);
    yield put<{ type: string; payload: SagaError }>({
      type: uploadFilesFailed.type,
      payload: { message: error.message },
    });
  }
}

export default function* watchAsync() {
  yield takeLatest(getChannels.type, fetchChannels);
  yield takeLatest(getChannel.type, fetchChannel);
  yield takeLatest(uploadFiles.type, fetchUploadFiles);
}
