import { authTypes } from "actions/auth.action";

const initialState: any = {
  isFirstStart: true,
  isLoggedIn: false,
  loading: false,
  token: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case authTypes.WELCOME_SCREEN:
      return { ...state, isFirstStart: action.show };

    case authTypes.RESET_STATE_KEY:
      return { ...state, [action.key]: initialState[action.key] };

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
        error: action.message || "Network error. Please try again.",
        loading: false,
      };

    case authTypes.CHECK_SUCCESS:
      const { isRegistered, isMobileVerified, isReset } = action;
      return {
        ...state,
        check: { isRegistered, isMobileVerified, isReset },
        loading: false,
      };

    case authTypes.OTP_SUCCESS:
      return {
        ...state,
        message: action.message,
        loading: false,
      };

    case authTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isRegistrationSuccess: true,
        message: action.message,
        loading: false,
      };

    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        token: action.token,
      };

    case authTypes.UPDATE_SUCCESS:
      return {
        ...state,
        isUpdateVerification: true,
        message: action.message,
        loading: false,
      };

    case authTypes.UPDATE_VERIFY_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        message: action.message,
        loading: false,
      };

    case authTypes.LOGOUT:
      return { ...state, ...initialState, isFirstStart: false };
  }

  return state;
};

export const auth = {
  initialState,
  reducer,
};
