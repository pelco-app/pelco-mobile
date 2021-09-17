import { authService } from "services";

export const authTypes = {
  TOGGLE_WELCOME_SCREEN: "TOGGLE_WELCOME_SCREEN",
  RESET_STATE_KEY: "RESET_STATE_KEY",

  REGISTER_REQUEST: "USER_REGISTER_REQUEST",
  REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
  REGISTER_FAILURE: "USER_REGISTER_FAILURE",

  LOGIN_REQUEST: "USER_LOGIN_REQUEST",
  LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  LOGIN_FAILURE: "USER_LOGIN_FAILURE",

  LOGOUT: "USER_LOGOUT",

  GET_USER: "USER_GET_CURRENT",
  GET_REQUEST: "USER_GET_REQUEST",
  GET_SUCCESS: "USER_GET_SUCCESS",
  GET_FAILURE: "USER_GET_FAILURE",
};

const welcome = (show: boolean) => ({
  type: authTypes.TOGGLE_WELCOME_SCREEN,
  show,
});

const login = (data: any) => {
  const request = (data: any) => ({ type: authTypes.LOGIN_REQUEST, ...data });
  const success = (data: any) => ({ type: authTypes.LOGIN_SUCCESS, ...data });
  const failure = (error: string) => ({ type: authTypes.LOGIN_FAILURE, error });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .login(data)
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };
};

const reset = (key: string) => ({
  type: authTypes.RESET_STATE_KEY,
  key,
});

const logout = () => ({ type: authTypes.LOGOUT });

export const authActions = {
  login,
  welcome,
  reset,
  logout,
};
