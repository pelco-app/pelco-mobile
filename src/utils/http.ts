import { Storage } from "@capacitor/storage";
import axios from "axios";

import store from "store";
import { authActions, messagesActions } from "states";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

instance.interceptors.request.use(
  async (config) => {
    try {
      const { auth, messages } = store.getState();

      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }

      if (messages.success) {
        store.dispatch(messagesActions.hideSuccess());
      } else if (messages.error) {
        store.dispatch(messagesActions.hideError());
      }

      return config;
    } catch (error) {
      console.log(error);
    }
  },
  (error) => console.log(error)
);

instance.interceptors.response.use(
  (response: any) => {
    const { data } = response;

    if (data.message) {
      store.dispatch(messagesActions.setSuccess(data.message));
    }

    return response;
  },
  ({ response }) => {
    const message = getMessage({ response, success: false });
    const { auth } = store.getState();

    store.dispatch(messagesActions.setError(message));

    if (auth.isLoggedIn && response?.status === 401) {
      store.dispatch(authActions.forceLogout());
    }

    return Promise.reject({ message });
  }
);

const validateErrors = (errors: any) => {
  errors = Object.values(errors);
  errors = errors.flat();

  return errors;
};

const getMessage = (data: any) => {
  try {
    if (!data.success) {
      if (data.response && data.response.data.errors) {
        return validateErrors(data.response.data.errors).join("\n");
      } else {
        return data.response.data.message;
      }
    }
  } catch (error) {
    return "Network error. Please try again.";
  }
};

export default instance;
