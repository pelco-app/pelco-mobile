import { IonItem, IonLabel, IonList, IonPage, useIonLoading, useIonToast } from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { authActions } from "context";
import { useEffect } from "react";
import { useContext, AppContext } from "State";
import { ScrollingContent } from "components";
import "./Account.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
  setShowRegistration: (state: boolean) => void;
  setShowOtp: (state: boolean) => void;
}

export const Account: React.FC<Props> = ({ setShowRegistration, setShowOtp, ...props }) => {
  const { state, dispatch } = useContext(AppContext);
  const { auth, device } = state;
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
