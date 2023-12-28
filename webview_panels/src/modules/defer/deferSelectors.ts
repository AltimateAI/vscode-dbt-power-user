import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectDeferReducerState = (state: RootState) => state.deferState;

export const selectDeferState = createSelector(
  selectDeferReducerState,
  (appState) => appState
);
