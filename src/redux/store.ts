import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import counterSlice from './slices/counter.slice';
import userSlice from './slices/user.slice';
import channelSlice from './slices/channel.slice';

import config from '@root/config';

const sagaMiddleware = createSagaMiddleware();
const devMode = config.NODE_ENV === 'development';

const rootReducer = {
  user: userSlice,
  channel: channelSlice,
  counter: counterSlice,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: devMode,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
