import { authTypes, deviceTypes } from "states";

const initialState: any = {
  name: "",
  deviceToken: null,
};

export const deviceReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case deviceTypes.SET_DEVICE_NAME:
      return { ...state, ...action.payload };

    case deviceTypes.SET_DEVICE_TOKEN:
      return { ...state, ...action.payload };

    case authTypes.LOGOUT_SUCCESS:
      return { ...state, deviceToken: null };
  }

  return state;
};
