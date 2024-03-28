import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStateProps, Themes } from "./types";

export const initialState = {
  theme: Themes.Dark,
  isComponentsApiInitialized: false,
} as AppStateProps;

const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<Themes>) => {
      state.theme = action.payload;
    },
    updateIsComponentsApiInitialized: (state, action: PayloadAction<boolean>) => {
      state.isComponentsApiInitialized = action.payload;
    },
  },
});

export const { updateTheme, updateIsComponentsApiInitialized } = appSlice.actions;
export default appSlice;
