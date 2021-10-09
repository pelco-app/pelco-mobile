import { Provider } from "react-redux";
import { IonApp, setupConfig } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SplashScreen } from "@capacitor/splash-screen";

import { store } from "store";
import AppRoutes from "AppRoutes";

import "styles/app.scss";

const App: React.FC = () => {
  setupConfig({ mode: "ios" });
  SplashScreen.show();

  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <AppRoutes />
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
