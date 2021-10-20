import React, { useEffect, useRef, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import {
  barChartOutline,
  calendarOutline,
  megaphoneOutline,
  personOutline,
  receiptOutline,
} from "ionicons/icons";

import { Account, Announcements, Bill, Bills, Dashboard, Schedules } from "pages";
import { OtpPane, RegistrationPane } from "components";
import { accountActions, useAppDispatch, useAppSelector } from "states";

import "./MainTabs.scss";

interface Props {}

export const MainTabs: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { account, auth } = useAppSelector((state) => state);
  const ionRouter = useIonRouter();
  const ionTabBar = useRef<any>();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [scrollToTop, doScrollToTop] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [delayer, setDelayer] = useState<any>();

  const activeTabHandler = () => {
    if (activeTab === ionTabBar.current?.ionTabContextState?.activeTab) {
      doScrollToTop((prev) => prev + 1);
    }
    setActiveTab(ionTabBar.current?.ionTabContextState?.activeTab);
  };

  const displayNotificationBadge = (count: number): JSX.Element => {
    if (count > 0) {
      return <IonBadge color="danger">{count}</IonBadge>;
    }

    return <></>;
  };

  useEffect(() => {
    if (delayer) {
      clearTimeout(delayer);
    }
    if (auth.token) {
      setDelayer(setTimeout(() => dispatch(accountActions.unreadNotificationCount()), 1000));
    }
  }, [auth.token, ionRouter.routeInfo.pathname]);

  return (
    <>
      <IonTabs ref={ionTabBar}>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/dashboard" />
          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard {...props} scrollToTop={scrollToTop} />}
          />
          <Route exact path="/bills" render={(props) => <Bills {...props} scrollToTop={scrollToTop} />} />
          <Route exact path="/bills/:id" render={(props) => <Bill {...props} />} />
          <Route
            exact
            path="/announcements"
            render={(props) => <Announcements {...props} scrollToTop={scrollToTop} />}
          />
          <Route
            exact
            path="/schedules"
            render={(props) => <Schedules {...props} scrollToTop={scrollToTop} />}
          />
          <Route
            exact
            path="/account"
            render={(props) => (
              <Account
                {...props}
                scrollToTop={scrollToTop}
                setShowOtp={setShowOtp}
                setShowRegistration={setShowRegistration}
              />
            )}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" onClick={activeTabHandler}>
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={barChartOutline} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>

          <IonTabButton tab="bills" href="/bills">
            <IonIcon icon={receiptOutline} />
            <IonLabel>Bills</IonLabel>
            {displayNotificationBadge(account.unreadNotificationCount.bills)}
          </IonTabButton>

          <IonTabButton tab="announcements" href="/announcements">
            <IonIcon icon={megaphoneOutline} />
            <IonLabel>Announcements</IonLabel>
            {displayNotificationBadge(account.unreadNotificationCount.announcements)}
          </IonTabButton>

          <IonTabButton tab="schedules" href="/schedules">
            <IonIcon icon={calendarOutline} />
            <IonLabel>Schedules</IonLabel>
            {displayNotificationBadge(account.unreadNotificationCount.schedules)}
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
