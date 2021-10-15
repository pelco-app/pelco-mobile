import http from "utils/http";

export const getUnreadNotificationCount = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: response } = await http.get("/user/unread-notification-count");
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};
