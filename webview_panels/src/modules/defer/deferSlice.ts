import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateState } from "../app/requestExecutor";

const initialState = {
  defer: false,
  favorState: false,
  manifestPathForDeferral: "",
};
const deferSlice = createSlice({
  name: "deferState",
  initialState,
  reducers: {
    // @ts-expect-error TODO fix this type
    updateState,
    updateDeferAndFavorState: (
      state,
      action: PayloadAction<{ key: "defer" | "favorState"; value: boolean }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateDeferAndFavorState } = deferSlice.actions;
export default deferSlice;
