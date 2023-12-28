import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  theme: "",
};
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
