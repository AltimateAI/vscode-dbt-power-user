import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DATA } from "./sampleData";
import { DataPilotChat, DataPilotStateProps } from "./types";

export const initialState = {
  items: DATA,
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
  },
});

export const { upsertItem } = dataPilotSlice.actions;
export default dataPilotSlice;
