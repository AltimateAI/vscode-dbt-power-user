import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStateProps } from "./types";

export const initialState = {
  theme: "",
} as AppStateProps;

const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = appSlice.actions;
export default appSlice;
