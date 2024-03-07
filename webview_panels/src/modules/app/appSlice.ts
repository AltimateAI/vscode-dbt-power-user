import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStateProps, Themes } from "./types";

export const initialState = {
  theme: Themes.Dark,
} as AppStateProps;

const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<Themes>) => {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = appSlice.actions;
export default appSlice;
