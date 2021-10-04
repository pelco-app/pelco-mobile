import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useIonRouter, useIonToast } from "@ionic/react";
import { App as AppPlugin } from "@capacitor/app";
import { Device } from "@capacitor/device";
import { AppContext, useContext } from "State";
import { MainTabs } from "components";
import { Login, Welcome } from "pages";
import { deviceActions } from "context";
import { useIsMounted } from "utils/useIsMounted";
import "styles/app.scss";

const App: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { auth } = state;
  const [presentToast] = useIonToast();
  const [lastBackPress, setLastBackPress] = useState<number>(0);
  const timePeriodToExit = 2000;
  const showWelcomeScreen = auth.isFirstStart;
  const showLoginScreen = !showWelcomeScreen && !auth.isLoggedIn;
  const showMainScreen = !showWelcomeScreen && auth.isLoggedIn;
  const ionRouter = useIonRouter();
  const isMounted = useIsMounted();
  const tabRoutes = ["/", "/dashboard", "/bills", "/schedules", "/account"];

  useEffect(() => {
    if (!isMounted) {
      const setDeviceName = async () => {
        const info = await Device.getInfo();
        dispatch(deviceActions.setDeviceName(info.model));
      };
      setDeviceName();
    }
  }, [isMounted]);

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
      }
    });
  });

  return (
    <>
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route path="/" component={showMainScreen ? MainTabs : showLoginScreen ? Login : Welcome} />
      <Route exact path="*" render={() => <Redirect to="/" />} />
    </>
  );
};

export default App;
