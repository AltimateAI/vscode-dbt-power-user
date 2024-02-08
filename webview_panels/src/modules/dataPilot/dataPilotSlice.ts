import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataPilotChat, DataPilotStateProps } from "./types";

export const initialState = {
  items: {},
  currentSessionId: undefined,
} as DataPilotStateProps;

const dataPilotSlice = createSlice({
  name: "dataPilotState",
  initialState,
  reducers: {
    setCurrentSessionId: (
      state,
      action: PayloadAction<DataPilotStateProps["currentSessionId"]>,
    ) => {
      state.currentSessionId = action.payload;
    },
    upsertItem: (
      state,
      action: PayloadAction<
        Partial<DataPilotChat> & { id: DataPilotChat["id"] }
      >,
    ) => {
      state.items[action.payload.id] = {
        ...state.items[action.payload.id],
        ...action.payload,
        updatedAt: new Date(),
      };
    },
    reset: () => initialState,
  },
});

export const { upsertItem, reset, setCurrentSessionId } =
  dataPilotSlice.actions;
export default dataPilotSlice;
