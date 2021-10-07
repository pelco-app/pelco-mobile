import { deviceTypes } from "./types";
import { authTypes } from "context/auth/types";

const initialState: any = {
  name: "",
  deviceToken: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case deviceTypes.SET_DEVICE_NAME:
      return { ...state, ...action.payload };

    case deviceTypes.SET_DEVICE_TOKEN:
      return { ...state, ...action.payload };

    case authTypes.LOGOUT:
      return { ...state, deviceToken: null };
  }

  return state;
};

export const device = {
  initialState,
  reducer,
};
