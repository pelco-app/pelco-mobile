import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "store";

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./account";
export * from "./auth";
export * from "./bills";
export * from "./device";
export * from "./messages";
