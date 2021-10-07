import http from "utils/http";

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

const logout = (deviceToken: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.post("/auth/logout", { deviceToken });
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

const register = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.post("/auth/register", data);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

const update = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.post("/auth/update", data);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

const updateResend = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.post("/auth/update/resend", data);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

const updateVerify = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.post("/auth/update/verify", data);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
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

export const authService = {
  check,
  current,
  logout,
  register,
  update,
  updateResend,
  updateVerify,
  verify,
};
