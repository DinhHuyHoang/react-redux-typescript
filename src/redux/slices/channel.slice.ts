import type { Channel, SagaError } from '@root/typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitState {
  isLoading: boolean;
  error: string;
  value: Channel[];
  currentChannel: Channel | null;
  uploadingFiles: FileList | null;
}

const initialState: InitState = {
  isLoading: false,
  error: '',
  value: [],
  currentChannel: null,
  uploadingFiles: null,
};

export const slice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setCurrentChannel(state, action: PayloadAction<{ channel: Channel }>) {
      state.currentChannel = action.payload.channel;
    },

    getChannels(state) {
      state.isLoading = true;

      state.value = [];
    },
    getChannelsSucceeded(state, action: PayloadAction<Channel[]>) {
      state.isLoading = false;

      const channels = action.payload;
      state.value = channels;
    },
    getChannelsFailed(state, action: PayloadAction<SagaError>) {
      state.isLoading = false;

      const { message } = action.payload;
      state.error = message;
    },

    getChannel(state) {
      state.isLoading = true;

      state.currentChannel = null;
    },
    getChannelSucceeded(state, action: PayloadAction<Channel>) {
      state.isLoading = false;

      const channel = action.payload;
      state.currentChannel = channel;
    },
    getChannelFailed(state, action: PayloadAction<SagaError>) {
      state.isLoading = false;

      const { message } = action.payload;
      state.error = message;
    },

    uploadFiles(state, action: PayloadAction<{ id: string; files: FileList }>) {
      state.isLoading = true;

      state.uploadingFiles = action.payload.files;
    },
    uploadFilesSucceeded(state) {
      state.isLoading = false;

      state.uploadingFiles = null;
    },
    uploadFilesFailed(state, action: PayloadAction<SagaError>) {
      state.isLoading = false;

      const { message } = action.payload;
      state.error = message;
    },
  },
});

export default slice.reducer;
export const {
  setCurrentChannel,
  getChannels,
  getChannelsFailed,
  getChannelsSucceeded,
  getChannel,
  getChannelSucceeded,
  getChannelFailed,
  uploadFiles,
  uploadFilesSucceeded,
  uploadFilesFailed,
} = slice.actions;
