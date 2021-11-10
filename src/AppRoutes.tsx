import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { isPlatform } from "@ionic/react";
import { Device } from "@capacitor/device";

import { Login, Welcome } from "pages";
import Tabs from "./Tabs";
import { deviceActions, useAppDispatch, useAppSelector } from "states";
import { useExitBack, useIsMounted, useMessages, useNotifications, usePersistentState } from "utils/hooks";

import "styles/app.scss";

const AppRoutes: React.FC = () => {
  useExitBack();
  useMessages();
  usePersistentState();
  const dispatch = useAppDispatch();
  const { auth, device } = useAppSelector((state) => state);
  const isMounted = useIsMounted();
  const { registerNotificationListeners } = useNotifications();
  const showWelcomeScreen = auth.isFirstStart;
  const showLoginScreen = !showWelcomeScreen && !auth.isLoggedIn;
  const showMainScreen = !showWelcomeScreen && auth.isLoggedIn;

  useEffect(() => {
    if (!isMounted) {
      const setDeviceName = async () => {
        const info = await Device.getInfo();
        if (device.name !== info.model) {
          dispatch(deviceActions.setDeviceName(info.model));
        }
      };
      setDeviceName();
    }
  }, [device.name, isMounted]);

  useEffect(() => {
    if (auth.token && isPlatform("capacitor")) {
      registerNotificationListeners();
    }
  }, [auth.token]);

  return (
    <>
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route path="/" component={showMainScreen ? Tabs : showLoginScreen ? Login : Welcome} />
      <Route exact path="*" render={() => <Redirect to="/" />} />
    </>
  );
};

export default AppRoutes;
