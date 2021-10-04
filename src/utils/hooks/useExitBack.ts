import { useState } from "react";
import { App as AppPlugin } from "@capacitor/app";
import { useIonRouter, useIonToast } from "@ionic/react";

export const useExitBack = () => {
  const [lastBackPress, setLastBackPress] = useState<number>(0);
  const [presentToast] = useIonToast();
  const ionRouter = useIonRouter();
  const timePeriodToExit = 2000;
  const tabRoutes = ["/", "/account", "/announcements", "/bills", "/dashboard", "/schedules"];

  document.addEventListener("ionBackButton", (ev: any) => {
    ev.detail.register(1, () => {
      if (!ionRouter.canGoBack() || tabRoutes.includes(ionRouter.routeInfo.pathname)) {
        if (new Date().getTime() - lastBackPress < timePeriodToExit) {
          AppPlugin.exitApp();
        } else {
          presentToast({
            duration: timePeriodToExit,
            message: "Press back again to exit the app.",
            color: "dark",
          });
          setLastBackPress(new Date().getTime());
        }
      } else {
        ionRouter.goBack();
      }
    });
  });

  return true;
};
