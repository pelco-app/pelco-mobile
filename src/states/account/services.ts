import http from "utils/http";

export const getUnreadNotificationCounts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.get("/user/unread-notification-counts");
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};
