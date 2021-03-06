import http from "utils/http";

export const setDeviceToken = (token: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.post("/user/token", { token });
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};
