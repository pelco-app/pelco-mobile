import axios from "axios";
import { Storage } from "@capacitor/storage";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

instance.interceptors.request.use(
  async (config) => {
    try {
      const { value } = await Storage.get({ key: "persistedState" });
      const states = value ? JSON.parse(value) : {};
      if (states?.auth?.token) {
        const [, token] = states.auth.token.split("|");
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.log(error);
    }
  },
  (error) => console.log(error)
);

instance.interceptors.response.use(
  (response) => response,
  ({ response }) => {
    const message = getMessage({ response, success: false });
    return Promise.reject({ message });
  }
);

const validateErrors = (errors: any) => {
  errors = Object.values(errors);
  errors = errors.flat();

  return errors;
};

const getMessage = (data: any) => {
  if (!data.success) {
    if (data.response && data.response.data.errors) {
      return validateErrors(data.response.data.errors).join("\n");
    } else {
      return data.response.data.message;
    }
  }
};

export default instance;
