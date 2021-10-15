import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { IonApp, IonLoading, setupConfig } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SplashScreen } from "@capacitor/splash-screen";

import store from "store";
import AppRoutes from "AppRoutes";
import { NetworkStatus } from "components";
import { getPersist } from "utils/storage";

import "styles/app.scss";

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  setupConfig({ mode: "ios" });
  SplashScreen.show();

  useEffect(() => {
    const setPersistentStates = async () => {
      const states = await getPersist();
      if (states) {
        store.dispatch({ type: "PERSIST", states });
      }
      setIsReady(true);
    };

    setPersistentStates();
  }, []);

  return isReady ? (
    <Provider store={store}>
      <IonApp>
        <NetworkStatus />
        <IonReactRouter>
          <AppRoutes />
        </IonReactRouter>
      </IonApp>
    </Provider>
  ) : (
    <IonLoading isOpen={!isReady} spinner="dots" />
  );
};

export default App;
