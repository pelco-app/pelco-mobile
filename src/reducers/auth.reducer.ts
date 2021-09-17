import { authTypes } from "actions/auth.action";

const initialState: any = {
  isFirstStart: true,
  isLoggedIn: false,
  loading: false,
  user: {},
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case authTypes.TOGGLE_WELCOME_SCREEN:
      return { ...state, isFirstStart: action.show };
    case authTypes.RESET_STATE_KEY:
      return { ...state, [action.key]: initialState[action.key] };
    case authTypes.LOGIN_REQUEST:
      return { ...state, loading: true };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        user: { accountNumber: action.accountNumber },
      };
    case authTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
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
