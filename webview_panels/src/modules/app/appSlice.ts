import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStateProps, Themes, User } from "./types";

export const initialState = {
  theme: Themes.Dark,
  isComponentsApiInitialized: false,
  users: {},
  currentUser: null,
  tenantInfo: {
    frontendUrl: null,
    currency: "USD",
    // This is tenant level global setting
    teammatesEnabled: false,
  },
} as AppStateProps;

const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setTenantInfo: (
      state,
      action: PayloadAction<AppStateProps["tenantInfo"]>,
    ) => {
      state.tenantInfo = action.payload;
    },
    updateTheme: (state, action: PayloadAction<Themes>) => {
      state.theme = action.payload;
    },
    updateIsComponentsApiInitialized: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isComponentsApiInitialized = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      if (!action.payload?.length) {
        return state;
      }
      return {
        ...state,
        users: action.payload.reduce((acc: Record<number, User>, user) => {
          acc[user.id] = user;
          return acc;
        }, {}),
      };
    },
    setCurrentUser: (
      state,
      action: PayloadAction<AppStateProps["currentUser"]>,
    ) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  updateTheme,
  updateIsComponentsApiInitialized,
  setUsers,
  setCurrentUser,
  setTenantInfo,
} = appSlice.actions;
export default appSlice;
