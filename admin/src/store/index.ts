import { configureStore } from '@reduxjs/toolkit'; import createSagaMiddleware from 'redux-saga'; import recruit from './recruitSlice'; import rootSaga from './sagas';
const saga = createSagaMiddleware(); export const store = configureStore({reducer:{recruit},middleware:g=>g({serializableCheck:false}).concat(saga)}); saga.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>; export type AppDispatch = typeof store.dispatch;
