import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataPilotChat, DataPilotStateProps } from "./types";

export const initialState = {
  items: {},
  currentSessionId: undefined,
  showHelp: false,
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
    setShowHelp: (
      state,
      action: PayloadAction<DataPilotStateProps["showHelp"]>,
    ) => {
      state.showHelp = action.payload;
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

export const { upsertItem, reset, setCurrentSessionId, setShowHelp } =
  dataPilotSlice.actions;
export default dataPilotSlice;
