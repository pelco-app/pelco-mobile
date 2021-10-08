import { authTypes } from "./types";

const initialState: any = {
  isFirstStart: true,
  isLoggedIn: false,
  loading: false,
  token: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case authTypes.WELCOME_SCREEN:
      return { ...state, isFirstStart: action.payload.show };

    case authTypes.RESET_STATE_KEY:
      return { ...state, [action.payload.key]: initialState[action.payload.key] };

    case authTypes.LOGIN_REQUEST:
    case authTypes.CHECK_REQUEST:
    case authTypes.OTP_REQUEST:
    case authTypes.REGISTER_REQUEST:
    case authTypes.UPDATE_REQUEST:
    case authTypes.UPDATE_VERIFY_REQUEST:
      return { ...state, loading: true };

    case authTypes.CHECK_FAILURE:
    case authTypes.LOGIN_FAILURE:
    case authTypes.OTP_FAILURE:
    case authTypes.REGISTER_FAILURE:
    case authTypes.UPDATE_FAILURE:
    case authTypes.UPDATE_VERIFY_FAILURE:
      return {
        ...state,
        error: action.payload.message || "Network error. Please try again.",
        loading: false,
      };

    case authTypes.CHECK_SUCCESS:
      return {
        ...state,
        check: { ...action.payload },
        loading: false,
      };

    case authTypes.OTP_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };

    case authTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isRegistrationSuccess: true,
        message: action.payload.message,
        loading: false,
      };

    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        token: action.payload.token,
      };

    case authTypes.UPDATE_SUCCESS:
      return {
        ...state,
        isUpdateVerification: true,
        message: action.payload.message,
        loading: false,
      };

    case authTypes.UPDATE_VERIFY_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        message: action.payload.message,
        loading: false,
      };

    case authTypes.LOGOUT:
      return { ...initialState, isFirstStart: false };
  }

  return state;
};

export const auth = {
  initialState,
  reducer,
};
