import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { AppContext, useContext } from "State";
import { MainTabs } from "components";
import { Login, Welcome } from "pages";
import "styles/app.scss";

const App: React.FC = () => {
  const { state } = useContext(AppContext);
  const { auth } = state;
  const showWelcomeScreen = !!auth.isFirstStart;
  const showLoginScreen = !showWelcomeScreen && !auth.isLoggedIn;
  const showMainScreen = !showWelcomeScreen && !!auth.isLoggedIn;

  return (
    <>
      {showWelcomeScreen && (
        <IonReactRouter>
          <Route path="/" component={Welcome} exact={true} />
          <Route path="*" render={() => <Redirect to="/" />} exact={true} />
        </IonReactRouter>
      )}

      {showLoginScreen && (
        <IonReactRouter>
          <Route path="/" component={Login} exact={true} />
          <Route path="*" render={() => <Redirect to="/" />} exact={true} />
        </IonReactRouter>
      )}

      {showMainScreen && (
        <IonReactRouter>
          <MainTabs />
        </IonReactRouter>
      )}
    </>
  );
};

export default App;
