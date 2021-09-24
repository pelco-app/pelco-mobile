import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

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
