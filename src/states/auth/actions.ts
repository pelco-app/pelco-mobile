import { authServices, authTypes } from "states";
import { removeNotificationListeners } from "utils/hooks";

export const check = (data: any) => {
  const request = (data: any) => ({ type: authTypes.CHECK_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.CHECK_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.CHECK_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authServices
      .check(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const verify = (data: any) => {
  const request = (data: any) => ({ type: authTypes.LOGIN_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.LOGIN_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.LOGIN_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authServices
      .verify(data)
      .then((response: any) => {
        const [, token] = response.token.split("|");
        dispatch(success({ token }));
      })
      .catch((error) => dispatch(failure(error)));
  };
};

export const logout = (deviceToken: string) => {
  removeNotificationListeners();
  authServices.logout(deviceToken);
  return { type: authTypes.LOGOUT };
};

export const forceLogout = () => {
  removeNotificationListeners();
  return { type: authTypes.FORCE_LOGOUT };
};

export const register = (data: any) => {
  const request = (data: any) => ({ type: authTypes.REGISTER_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.REGISTER_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.REGISTER_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authServices
      .register(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const update = (data: any) => {
  const request = (data: any) => ({ type: authTypes.UPDATE_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.UPDATE_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.UPDATE_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authServices
      .update(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const updateVerify = (data: any) => {
  const request = (data: any) => ({ type: authTypes.UPDATE_VERIFY_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.UPDATE_VERIFY_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.UPDATE_VERIFY_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authServices
      .updateVerify(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const updateResend = (data: any) => {
  const request = (data: any) => ({ type: authTypes.OTP_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.OTP_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.OTP_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authServices
      .updateResend({ ...data, resend: true })
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const resend = (data: any) => {
  const request = (data: any) => ({ type: authTypes.OTP_REQUEST, payload: { ...data } });
  const success = (data: any) => ({ type: authTypes.OTP_SUCCESS, payload: { ...data } });
  const failure = (data: any) => ({ type: authTypes.OTP_FAILURE, payload: { ...data } });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authServices
      .check({ ...data, resend: true })
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

export const reset = (key: string) => ({ type: authTypes.RESET_STATE_KEY, payload: { key } });

export const welcome = (show: boolean) => ({ type: authTypes.WELCOME_SCREEN, payload: { show } });
