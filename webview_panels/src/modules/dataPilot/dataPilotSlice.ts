import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DataPilotChat,
  DataPilotChatFollowup,
  DataPilotStateProps,
} from "./types";

export const initialState = {
  items: {},
  currentSessionId: undefined,
  showHelp: false,
  packageVersions: {},
} as DataPilotStateProps;

const dataPilotSlice = createSlice({
  name: "dataPilotState",
  initialState,
  reducers: {
    updatePackageVersions: (
      state,
      action: PayloadAction<DataPilotStateProps["packageVersions"]>,
    ) => {
      state.packageVersions = { ...state.packageVersions, ...action.payload };
    },
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
    upsertFollowup: (
      state,
      {
        payload: { followup, sessionId },
      }: PayloadAction<{
        sessionId: DataPilotChat["id"];
        followup: DataPilotChatFollowup;
      }>,
    ) => {
      if (!state.items[sessionId]) {
        return;
      }

      const { followups } = state.items[sessionId];

      if (!followups?.length) {
        state.items[sessionId].followups = [followup];
        return;
      }
      const currentIndex = followups.findIndex((r) => r.id === followup.id);
      if (currentIndex === -1) {
        state.items[sessionId].followups = [...followups, followup];
        return;
      }

      const clone = [...followups];
      clone[currentIndex] = {
        ...clone[currentIndex],
        ...followup,
      };
      state.items[sessionId].followups = clone;
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

export const {
  updatePackageVersions,
  upsertItem,
  reset,
  setCurrentSessionId,
  setShowHelp,
  upsertFollowup,
} = dataPilotSlice.actions;
export default dataPilotSlice;
