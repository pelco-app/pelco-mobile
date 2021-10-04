import { useState } from "react";
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { barChartOutline, calendarOutline, megaphoneOutline, personOutline, receiptOutline } from "ionicons/icons";
import { useContext, AppContext } from "State";
import { Account, Announcements, Bills, Dashboard, Schedules } from "pages";
import { OtpPane, RegistrationPane } from "components";
import "./MainTabs.scss";

interface Props {}

export const MainTabs: React.FC<Props> = () => {
  const { state } = useContext(AppContext);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<any>("");

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/dashboard" />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/bills" component={Bills} />
          <Route exact path="/bills/:id" component={Bills} />
          <Route exact path="/announcements" component={Announcements} />
          <Route exact path="/schedules" component={Schedules} />
          <Route
            exact
            path="/account"
            render={(props) => <Account {...props} setShowRegistration={setShowRegistration} setShowOtp={setShowOtp} />}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={barChartOutline} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="bills" href="/bills">
            <IonIcon icon={receiptOutline} />
            <IonLabel>Bills</IonLabel>
          </IonTabButton>
          <IonTabButton tab="announcements" href="/announcements">
            <IonIcon icon={megaphoneOutline} />
            <IonLabel>Announcements</IonLabel>
          </IonTabButton>
          <IonTabButton tab="schedules" href="/schedules">
            <IonIcon icon={calendarOutline} />
            <IonLabel>Schedules</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonIcon icon={personOutline} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      <RegistrationPane
        buttonLabel="Continue"
        header="Change Mobile Number"
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        setShowPane={setShowRegistration}
        showPane={showRegistration}
      />

      <OtpPane buttonLabel="Update" mobileNumber={mobileNumber} setShowPane={setShowOtp} showPane={showOtp} />
    </>
  );
};
