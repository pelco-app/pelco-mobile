import { isPlatform, useIonRouter } from "@ionic/react";
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from "@capacitor/push-notifications";
import { accountActions, billActions, deviceActions, useAppDispatch } from "states";

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const ionRouter = useIonRouter();

  const registerNotificationListeners = async () => {
    try {
      if ((await PushNotifications.requestPermissions()).receive !== "granted") return;

      PushNotifications.register();

      PushNotifications.addListener("registration", (token: Token) => {
        dispatch(deviceActions.setDeviceToken(token.value));
      });

      PushNotifications.addListener("pushNotificationReceived", (notification: PushNotificationSchema) => {
        const { data } = notification;
        if (data?.type) {
          dispatch(accountActions.unreadNotificationCount());

          switch (data.type) {
            case "bills":
              dispatch(billActions.fetch());
              break;

            case "announcements":
              // dispatch(billActions.fetch());
              break;

            case "schedules":
              // dispatch(billActions.fetch());
              break;
            default:
              break;
          }
        }
      });

      PushNotifications.addListener("pushNotificationActionPerformed", (action: ActionPerformed) => {
        const { data } = action.notification;
        const currentPathName = ionRouter.routeInfo.pathname;
        const targetPathName = `/${data?.type}${data?.reference_id ? `/${data?.reference_id}` : ""}`;

        if (data?.type && currentPathName !== targetPathName) {
          dispatch(billActions.fetch());
          ionRouter.push(targetPathName);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { registerNotificationListeners };
};

export const removeNotificationListeners = async () => {
  if (isPlatform("capacitor")) {
    await PushNotifications.removeAllListeners();
  }
};
