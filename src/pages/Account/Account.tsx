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
  const { auth, device, messages } = useAppSelector((state) => state);
  const [, dismissLoading] = useIonLoading();

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
    dismissLoading();
  }, [messages]);

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
