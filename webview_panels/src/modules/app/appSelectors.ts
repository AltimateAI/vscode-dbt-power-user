import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAppState = (state: RootState) => state.appState;

export const selectAppTheme = createSelector(
  selectAppState,
  (appState) => appState.theme
);
