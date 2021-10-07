import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { Device } from "@capacitor/device";
import { isPlatform } from "@ionic/react";
import { AppContext, useContext } from "State";
import { MainTabs } from "components";
import { Login, Welcome } from "pages";
import { deviceActions } from "context";
import { useExitBack, useIsMounted, useNotifications } from "utils/hooks";
import "styles/app.scss";

const App: React.FC = () => {
  useExitBack();
  const isMounted = useIsMounted();
  const { registerNotificationListeners } = useNotifications();
  const { state, dispatch } = useContext(AppContext);
  const { auth } = state;
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

export default App;
