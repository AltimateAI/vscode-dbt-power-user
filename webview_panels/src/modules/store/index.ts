import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import appSlice from "../app/appSlice";
import deferSlice from "../defer/deferSlice";

const reducers = [appSlice, deferSlice];

export const getReducerByName = (
  reducerPath: keyof typeof reducers
): ReturnType<typeof createSlice> | undefined =>
  // @ts-expect-error TODO fix this type
  reducers.find((r) => r.name === reducerPath);

export const createRootReducer = () =>
  combineReducers({
    appState: appSlice.reducer,
    deferState: deferSlice.reducer,
  });

export const setupStore = () =>
  configureStore({
    reducer: createRootReducer(),
    preloadedState: {},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: true,
      }),
  });

export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
