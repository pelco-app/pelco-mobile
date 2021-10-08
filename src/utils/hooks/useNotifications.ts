import { useIonRouter } from "@ionic/react";
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from "@capacitor/push-notifications";
import { deviceActions } from "context";
import { useContext, AppContext } from "State";
import { isPlatform } from "@ionic/react";

export const useNotifications = () => {
  const { dispatch } = useContext(AppContext);
  const ionRouter = useIonRouter();

  const registerNotificationListeners = async () => {
    try {
      if ((await PushNotifications.requestPermissions()).receive !== "granted") return;

      PushNotifications.register();

      PushNotifications.addListener("registration", (token: Token) => {
        dispatch(deviceActions.setDeviceToken(token.value));
      });

      PushNotifications.addListener("pushNotificationReceived", (notification: PushNotificationSchema) => {
        console.log("Push received: ", notification);
      });

      PushNotifications.addListener("pushNotificationActionPerformed", (action: ActionPerformed) => {
        const { data } = action.notification;
        const currentPathName = ionRouter.routeInfo.pathname;
        const targetPathName = `/${data?.type}${data?.reference_id ? `/${data?.reference_id}` : ""}`;

        if (data?.type && currentPathName !== targetPathName) {
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
  if (isPlatform("android")) {
    await PushNotifications.removeAllListeners();
  }
};
