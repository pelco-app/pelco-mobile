import { LocalNotifications } from "@capacitor/local-notifications";
import { useIonRouter } from "@ionic/react";

interface Extra {
  type?: "announcement" | "bill" | "schedule";
  id?: string | number;
}

interface Notification {
  id: number;
  title: string;
  body: string;
  summaryText?: string;
  extra?: Extra;
}

export const useNotifications = () => {
  const ionRouter = useIonRouter();

  const notify = async ({ id, title, body, summaryText, extra }: Notification) => {
    try {
      if ((await LocalNotifications.requestPermissions()).display !== "granted") return;

      await LocalNotifications.schedule({
        notifications: [
          {
            id,
            title,
            body,
            largeBody: body,
            summaryText,
            extra,
            // ongoing: true,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const registerNotificationListeners = async () => {
    try {
      if ((await LocalNotifications.requestPermissions()).display !== "granted") return;

      LocalNotifications.addListener("localNotificationReceived", (notification) => {
        console.log(notification);
      });

      LocalNotifications.addListener("localNotificationActionPerformed", ({ notification }) => {
        switch (notification.extra?.type) {
          case "announcement":
            ionRouter.push("/announcements");
            break;
          case "bill":
            ionRouter.push("/bills/1");
            break;
          case "schedule":
            ionRouter.push("/schedules");
            break;
          default:
            break;
        }
        console.log(notification);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { notify, registerNotificationListeners };
};

export const removeNotificationListeners = async () => {
  await LocalNotifications.removeAllListeners();
};
