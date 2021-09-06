import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle, person } from "ionicons/icons";
import Dashboard from "./pages/Dashboard";
import Bills from "./pages/Bills";
import Schedules from "./pages/Schedules";
import Account from "./pages/Account";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/bills">
            <Bills />
          </Route>
          <Route path="/schedules">
            <Schedules />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={triangle} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="bills" href="/bills">
            <IonIcon icon={ellipse} />
            <IonLabel>Bills</IonLabel>
          </IonTabButton>
          <IonTabButton tab="schedules" href="/schedules">
            <IonIcon icon={square} />
            <IonLabel>Schedules</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonIcon icon={person} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
