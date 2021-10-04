import { deviceTypes } from "./types";

const initialState: any = {
  name: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case deviceTypes.SET_DEVICE_NAME:
      return { ...state, name: action.name };
  }

  return state;
};

export const device = {
  initialState,
  reducer,
};
