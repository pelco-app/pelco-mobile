import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IonItem, IonLabel, IonList, IonPage, useIonLoading, useIonToast } from "@ionic/react";

import { ScrollingContent } from "components";
import { authActions, useAppDispatch, useAppSelector } from "states";

import "./Account.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
  setShowOtp: (state: boolean) => void;
  setShowRegistration: (state: boolean) => void;
}

export const Account: React.FC<Props> = ({ setShowOtp, setShowRegistration, ...props }) => {
  const dispatch = useAppDispatch();
  const { auth, device } = useAppSelector((state) => state);
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
      <ScrollingContent {...props} title="Account">
        <IonList>
          <IonItem>
            <IonLabel onClick={() => setShowRegistration(true)}>Change Mobile Number</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => dispatch(authActions.logout(device.deviceToken))}>Logout</IonLabel>
          </IonItem>
        </IonList>
      </ScrollingContent>
    </IonPage>
  );
};
