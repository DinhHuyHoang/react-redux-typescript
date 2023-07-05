import type { User, SagaError } from '@root/typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitState {
  isLoading: boolean;
  error: string;
  value: User[];
  currentUser: User | null;
}

const initialState: InitState = {
  isLoading: false,
  error: '',
  value: [],
  currentUser: null,
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state) {
      state.isLoading = true;

      state.value = [];
    },
    getUsersSucceeded(state, action: PayloadAction<User[]>) {
      state.isLoading = false;

      const users = action.payload;
      state.value = users;
    },
    getUsersFailed(state, action: PayloadAction<SagaError>) {
      state.isLoading = false;

      const { message } = action.payload;
      state.error = message;
    },

    getUser(state, action: PayloadAction<{ id: number }>) {
      state.isLoading = true;
      state.currentUser = null;
    },
    getUserSucceeded(state, action: PayloadAction<User>) {
      state.isLoading = false;

      const user = action.payload;
      state.currentUser = user;
    },
    getUserFailed(state, action: PayloadAction<SagaError>) {
      state.isLoading = false;

      const { message } = action.payload;
      state.error = message;
    },
  },
});

export default slice.reducer;
export const { getUsers, getUsersSucceeded, getUsersFailed, getUser, getUserSucceeded, getUserFailed } = slice.actions;
