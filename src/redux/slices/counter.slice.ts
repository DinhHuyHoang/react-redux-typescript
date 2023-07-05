import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { incrementAsync } from '../actions/counter';
import type { incrementPayloadType } from '../actions/counter';
import type { RootState } from '../store';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync, (state, action: PayloadAction<incrementPayloadType>) => {
      console.log('extraReducers', action);

      state.value += 1;
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export { incrementAsync };
export default counterSlice.reducer;
