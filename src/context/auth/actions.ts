import { authService } from "./services";
import { authTypes } from "./types";

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

const register = (data: any) => {
  const request = (data: any) => ({ type: authTypes.REGISTER_REQUEST, ...data });
  const success = (data: any) => ({ type: authTypes.REGISTER_SUCCESS, ...data });
  const failure = (error: any) => ({ type: authTypes.REGISTER_FAILURE, ...error });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .register(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const update = (data: any) => {
  const request = (data: any) => ({ type: authTypes.UPDATE_REQUEST, ...data });
  const success = (data: any) => ({ type: authTypes.UPDATE_SUCCESS, ...data });
  const failure = (error: any) => ({ type: authTypes.UPDATE_FAILURE, ...error });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .update(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const updateVerify = (data: any) => {
  const request = (data: any) => ({ type: authTypes.UPDATE_VERIFY_REQUEST, ...data });
  const success = (data: any) => ({ type: authTypes.UPDATE_VERIFY_SUCCESS, ...data });
  const failure = (error: any) => ({ type: authTypes.UPDATE_VERIFY_FAILURE, ...error });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .updateVerify(data)
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

const updateResend = (data: any) => {
  const request = (data: any) => ({ type: authTypes.OTP_REQUEST, ...data });
  const success = (data: any) => ({ type: authTypes.OTP_SUCCESS, ...data });
  const failure = (error: any) => ({ type: authTypes.OTP_FAILURE, ...error });

  return (dispatch: Function) => {
    dispatch(request(data));

    return authService
      .updateResend({ ...data, resend: true })
      .then((response) => dispatch(success(response)))
      .catch((error) => dispatch(failure(error)));
  };
};

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
};

const reset = (key: string) => ({ type: authTypes.RESET_STATE_KEY, key });

const welcome = (show: boolean) => ({ type: authTypes.WELCOME_SCREEN, show });

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
