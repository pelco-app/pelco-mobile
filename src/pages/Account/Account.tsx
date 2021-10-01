import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { authActions } from "actions";
import { useState, useEffect } from "react";
import { useContext, AppContext } from "State";
import "./Account.scss";

interface Props {
  setShowRegistration: (state: boolean) => void;
  setShowOtp: (state: boolean) => void;
}

export const Account: React.FC<Props> = ({ setShowRegistration, setShowOtp }) => {
  const { state, dispatch } = useContext(AppContext);
  const { auth } = state;
  const [, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  useEffect((): any => {
    if (auth.isUpdateVerification) {
      setShowOtp(true);
      dispatch(authActions.reset("isUpdateVerification"));
    }
  }, [auth.isUpdateVerification]);

  useEffect((): any => {
    if (auth.isUpdateSuccess) {
      setShowRegistration(false);
      setShowOtp(false);
      dispatch(authActions.reset("isUpdateSuccess"));
    }
  }, [auth.isUpdateSuccess]);

  useEffect(() => {
    if (auth.error) {
      presentToast({ duration: 3000, message: auth.error, color: "dark" });
      dispatch(authActions.reset("error"));
    } else if (auth.message) {
      presentToast({ duration: 3000, message: auth.message, color: "dark" });
      dispatch(authActions.reset("message"));
    }
    dismissLoading();
  }, [auth.error, auth.message]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Account</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem>
            <IonLabel onClick={() => setShowRegistration(true)}>Change Mobile Number</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => dispatch(authActions.logout())}>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
