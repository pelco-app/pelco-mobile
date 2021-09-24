import { authService } from "services";

export const authTypes = {
  WELCOME_SCREEN: "TOGGLE_WELCOME_SCREEN",
  RESET_STATE_KEY: "RESET_STATE_KEY",

  OTP_REQUEST: "OTP_REQUEST",
  OTP_SUCCESS: "OTP_SUCCESS",
  OTP_FAILURE: "OTP_FAILURE",

  CHECK_REQUEST: "USER_CHECK_REQUEST",
  CHECK_SUCCESS: "USER_CHECK_SUCCESS",
  CHECK_FAILURE: "USER_CHECK_FAILURE",

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

const check = (data: any) => {
  const request = (data: any) => ({ type: authTypes.CHECK_REQUEST, ...data });
  const success = (data: any) => ({ type: authTypes.CHECK_SUCCESS, ...data });
  const failure = (error: any) => ({ type: authTypes.CHECK_FAILURE, ...error });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .check(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const verify = (data: any) => {
  const request = (data: any) => ({ type: authTypes.LOGIN_REQUEST, ...data });
  const success = (data: any) => ({ type: authTypes.LOGIN_SUCCESS, ...data });
  const failure = (error: any) => ({ type: authTypes.LOGIN_FAILURE, ...error });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .verify(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const logout = () => ({ type: authTypes.LOGOUT });

const resend = (data: any) => {
  const request = (data: any) => ({ type: authTypes.OTP_REQUEST, ...data });
  const success = (data: any) => ({ type: authTypes.OTP_SUCCESS, ...data });
  const failure = (error: any) => ({ type: authTypes.OTP_FAILURE, ...error });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .check({ ...data, resend: true })
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
  return () => authService.resend(data);
};

const reset = (key: string) => ({ type: authTypes.RESET_STATE_KEY, key });

const welcome = (show: boolean) => ({ type: authTypes.WELCOME_SCREEN, show });

export const authActions = {
  check,
  logout,
  resend,
  reset,
  verify,
  welcome,
};
