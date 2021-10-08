import http from "utils/http";

const fetch = (url?: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [, query] = url?.split("?") || [, ,];
      const pageQuery = query ? `?${query}` : "";
      const { data: response } = await http.get(`/bills${pageQuery}`);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

const get = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.get(`/bills/${id}`);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};

export const billService = {
  fetch,
  get,
};
