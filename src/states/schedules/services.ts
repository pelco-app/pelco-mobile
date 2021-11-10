import http from "utils/http";

export const fetch = (url?: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [, query] = url?.split("?") || [, ,];
      const pageQuery = query ? `?${query}` : "";
      const { data: response } = await http.get(`/schedules${pageQuery}`);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

export const get = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.get(`/schedules/${id}`);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};
