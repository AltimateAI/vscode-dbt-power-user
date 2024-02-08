import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataPilotChat, DataPilotStateProps } from "./types";

export const initialState = {
  items: {},
} as DataPilotStateProps;

const dataPilotSlice = createSlice({
  name: "dataPilotState",
  initialState,
  reducers: {
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

export const { upsertItem, reset } = dataPilotSlice.actions;
export default dataPilotSlice;
