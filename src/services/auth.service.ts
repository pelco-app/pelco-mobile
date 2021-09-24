import http from "utils/http";

const mockRequest = (data: any, success: boolean = true) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => (success ? resolve(data) : reject(data)), 3000)
  );
};

const check = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.post("/auth/check", data);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

const current = () => {
  return http.get("/user").then((res) => {
    return res.data;
  });
};

const verify = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.post("/auth/verify", data);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

const logout = () => {
  return http.get("/logout").then((res) => {
    return res.data;
  });
};

const register = (data: any) => {
  return mockRequest(data).then((res) => res);
};

const resend = (data: any) => {
  return mockRequest(data).then((res) => res);
};

export const authService = {
  check,
  current,
  verify,
  logout,
  register,
  resend,
};
