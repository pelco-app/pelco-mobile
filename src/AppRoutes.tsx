import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { isPlatform } from "@ionic/react";
import { Device } from "@capacitor/device";

import { Login, Welcome } from "pages";
import { MainTabs } from "components";
import { deviceActions, useAppDispatch, useAppSelector } from "states";
import { useExitBack, useIsMounted, useNotifications, usePersistentState } from "utils/hooks";

import "styles/app.scss";

const AppRoutes: React.FC = () => {
  useExitBack();
  usePersistentState();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const isMounted = useIsMounted();
  const { registerNotificationListeners } = useNotifications();
  const showWelcomeScreen = auth.isFirstStart;
  const showLoginScreen = !showWelcomeScreen && !auth.isLoggedIn;
  const showMainScreen = !showWelcomeScreen && auth.isLoggedIn;

  useEffect(() => {
    if (!isMounted) {
      const setDeviceName = async () => {
        const info = await Device.getInfo();
        dispatch(deviceActions.setDeviceName(info.model));
      };
      setDeviceName();
    }
  }, [isMounted]);

  useEffect(() => {
    if (auth.token && isPlatform("android")) {
      registerNotificationListeners();
    }
  }, [auth.token]);

  return (
    <>
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route path="/" component={showMainScreen ? MainTabs : showLoginScreen ? Login : Welcome} />
      <Route exact path="*" render={() => <Redirect to="/" />} />
    </>
  );
};

export default AppRoutes;
