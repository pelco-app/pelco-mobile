import http from "utils/http";

export const fetch = (year: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.get(`/dashboard/${year}`);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};
