import { authTypes } from "actions/auth.action";

const initialState: any = {
  isFirstStart: true,
  isLoggedIn: false,
  loading: false,
  user: {},
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
      return { ...state, loading: true };

    case authTypes.CHECK_SUCCESS:
      const { isRegistered, isMobileVerified, isReset } = action;
      return {
        ...state,
        check: { isRegistered, isMobileVerified, isReset },
        loading: false,
      };

    case authTypes.OTP_SUCCESS:
      const { message } = action;
      return {
        ...state,
        message,
        loading: false,
      };

    case authTypes.CHECK_FAILURE:
    case authTypes.LOGIN_FAILURE:
    case authTypes.OTP_FAILURE:
      return {
        ...state,
        error: action.message,
        loading: false,
      };

    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        user: { token: action.token },
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
