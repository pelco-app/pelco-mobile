import { useRef, useState } from "react";
import { IonBadge, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { barChartOutline, calendarOutline, megaphoneOutline, personOutline, receiptOutline } from "ionicons/icons";
import { useContext, AppContext } from "State";
import { Account, Announcements, Bills, Bill, Dashboard, Schedules } from "pages";
import { OtpPane, RegistrationPane } from "components";
import "./MainTabs.scss";

interface Props {}

export const MainTabs: React.FC<Props> = () => {
  const { state } = useContext(AppContext);
  const { announcements, bills, dashboard, schedules } = state;
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<any>("");
  const ionTabBar = useRef<any>();
  const [scrollToTop, doScrollToTop] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const activeTabHandler = (e: any) => {
    if (activeTab === ionTabBar.current?.ionTabContextState?.activeTab) {
      doScrollToTop((prev) => prev + 1);
    }
    setActiveTab(ionTabBar.current?.ionTabContextState?.activeTab);
  };

  return (
    <>
      <IonTabs ref={ionTabBar}>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/dashboard" />
          <Route exact path="/dashboard" render={(props) => <Dashboard {...props} scrollToTop={scrollToTop} />} />
          <Route exact path="/bills" render={(props) => <Bills {...props} scrollToTop={scrollToTop} />} />
          <Route exact path="/bills/:id" render={(props) => <Bill {...props} scrollToTop={scrollToTop} />} />
          <Route
            exact
            path="/announcements"
            render={(props) => <Announcements {...props} scrollToTop={scrollToTop} />}
          />
          <Route exact path="/schedules" render={(props) => <Schedules {...props} scrollToTop={scrollToTop} />} />
          <Route
            exact
            path="/account"
            render={(props) => (
              <Account
                {...props}
                scrollToTop={scrollToTop}
                setShowRegistration={setShowRegistration}
                setShowOtp={setShowOtp}
              />
            )}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" onClick={activeTabHandler}>
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={barChartOutline} />
            <IonLabel>Dashboard</IonLabel>
            {dashboard?.unreadNotificationCount > 0 && (
              <IonBadge color="danger">{dashboard.unreadNotificationCount}</IonBadge>
            )}
          </IonTabButton>
          <IonTabButton tab="bills" href="/bills">
            <IonIcon icon={receiptOutline} />
            <IonLabel>Bills</IonLabel>
            {bills?.unreadNotificationCount > 0 && <IonBadge color="danger">{bills.unreadNotificationCount}</IonBadge>}
          </IonTabButton>
          <IonTabButton tab="announcements" href="/announcements">
            <IonIcon icon={megaphoneOutline} />
            <IonLabel>Announcements</IonLabel>
            {announcements?.unreadNotificationCount > 0 && (
              <IonBadge color="danger">{announcements.unreadNotificationCount}</IonBadge>
            )}
          </IonTabButton>
          <IonTabButton tab="schedules" href="/schedules">
            <IonIcon icon={calendarOutline} />
            <IonLabel>Schedules</IonLabel>
            {schedules?.unreadNotificationCount > 0 && (
              <IonBadge color="danger">{schedules.unreadNotificationCount}</IonBadge>
            )}
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
