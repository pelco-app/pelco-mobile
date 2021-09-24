import { useState, useEffect } from "react";
import { IonApp, setupConfig } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SplashScreen } from "@capacitor/splash-screen";
import { AppContextProvider } from "State";
import AppRoutes from "AppRoutes";
import "styles/app.scss";

const App: React.FC = () => {
  setupConfig({
    mode: "ios",
  });
  SplashScreen.show();

  return (
    <IonApp>
      <AppContextProvider>
        <IonReactRouter>
          <AppRoutes />
        </IonReactRouter>
      </AppContextProvider>
    </IonApp>
  );
};

export default App;
