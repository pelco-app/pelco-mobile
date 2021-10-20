import { useState } from "react";
import { App } from "@capacitor/app";
import { useIonRouter, useIonToast } from "@ionic/react";

export const useExitBack = () => {
  const timePeriodToExit = 2000;
  const tabRoutes = ["/", "/account", "/announcements", "/bills", "/dashboard", "/schedules"];
  const [lastBackPress, setLastBackPress] = useState<number>(0);
  const [presentToast] = useIonToast();
  const ionRouter = useIonRouter();

  document.addEventListener("ionBackButton", (event: Event) => {
    (<CustomEvent>event).detail.register(1, () => {
      if (!ionRouter.canGoBack() || tabRoutes.includes(ionRouter.routeInfo.pathname)) {
        if (new Date().getTime() - lastBackPress < timePeriodToExit) {
          App.exitApp();
        } else {
          presentToast({
            duration: timePeriodToExit,
            message: "Press back again to exit the app.",
            color: "dark",
          });
          setLastBackPress(new Date().getTime());
        }
      } else {
        if (/announcements\//.test(ionRouter.routeInfo.pathname)) {
          ionRouter.push("/announcements", "back");
        } else if (/bills\//.test(ionRouter.routeInfo.pathname)) {
          ionRouter.push("/bills", "back");
        } else if (/schedules\//.test(ionRouter.routeInfo.pathname)) {
          ionRouter.push("/schedules", "back");
        } else {
          ionRouter.goBack();
        }
      }
    });
  });
};
