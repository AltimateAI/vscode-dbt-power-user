import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CopilotStateProps } from "./types";

export const initialState = {
  isCopilotOpen: false,
} as CopilotStateProps;

const copilotSlice = createSlice({
  name: "copilotState",
  initialState,
  reducers: {
    toggleCopilot: (state, action: PayloadAction<boolean>) => {
      state.isCopilotOpen = action.payload;
    },
  },
});

export const { toggleCopilot } = copilotSlice.actions;
export default copilotSlice;
