import { useState, useEffect } from "react";
import { IonApp } from "@ionic/react";
import { SplashScreen } from "@capacitor/splash-screen";
import { AppContextProvider } from "State";
import AppRoutes from "AppRoutes";
import "styles/app.scss";

const App: React.FC = () => {
  SplashScreen.show();

  return (
    <IonApp>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </IonApp>
  );
};

export default App;
