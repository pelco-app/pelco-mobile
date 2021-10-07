import { removeNotificationListeners } from "utils/hooks";
import { authService } from "./services";
import { authTypes } from "./types";

const check = (data: any) => {
  const request = (data: any) => ({ type: authTypes.CHECK_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.CHECK_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.CHECK_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .check(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const verify = (data: any) => {
  const request = (data: any) => ({ type: authTypes.LOGIN_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.LOGIN_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.LOGIN_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .verify(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const logout = (deviceToken: string) => {
  removeNotificationListeners();
  authService.logout(deviceToken);
  return { type: authTypes.LOGOUT };
};

const register = (data: any) => {
  const request = (data: any) => ({ type: authTypes.REGISTER_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.REGISTER_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.REGISTER_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .register(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const update = (data: any) => {
  const request = (data: any) => ({ type: authTypes.UPDATE_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.UPDATE_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.UPDATE_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .update(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const updateVerify = (data: any) => {
  const request = (data: any) => ({ type: authTypes.UPDATE_VERIFY_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.UPDATE_VERIFY_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.UPDATE_VERIFY_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .updateVerify(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const updateResend = (data: any) => {
  const request = (data: any) => ({ type: authTypes.OTP_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.OTP_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.OTP_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .updateResend({ ...data, resend: true })
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const resend = (data: any) => {
  const request = (data: any) => ({ type: authTypes.OTP_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.OTP_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.OTP_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .check({ ...data, resend: true })
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const reset = (key: string) => ({ type: authTypes.RESET_STATE_KEY, payload: { key } });

const welcome = (show: boolean) => ({ type: authTypes.WELCOME_SCREEN, payload: { show } });

export const authActions = {
  check,
  logout,
  register,
  resend,
  reset,
  update,
  updateResend,
  updateVerify,
  verify,
  welcome,
};
