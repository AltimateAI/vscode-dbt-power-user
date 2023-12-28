import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from ".";

export type AppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
