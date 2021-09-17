import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { triangle, ellipse, square, person } from "ionicons/icons";
import { useContext, AppContext } from "State";
import { Account, Bills, Dashboard, Schedules } from "pages";
import "./MainTabs.scss";

interface Props {}

export const MainTabs: React.FC<Props> = () => {
  const { state } = useContext(AppContext);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/dashboard" />
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
  );
};
