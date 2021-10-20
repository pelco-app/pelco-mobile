import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
} from "@ionic/react";

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
  const { account, auth, device } = useAppSelector((state) => state);

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

  return (
    <IonPage>
      <IonLoading isOpen={auth.loading} message="Please wait..." />

      <ScrollingContent {...props} className="account-page" title="Account">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{account.user.name}</IonCardTitle>
            <IonCardSubtitle>
              {account.user.accountType} | {account.user.accountNumber}
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className="card-content">
            <IonItem>
              <p>Address: {account.user.address}</p>
            </IonItem>
            <IonItem lines="none">
              <p>Mobile Number: {account.user.mobileNumber}</p>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonList>
          <IonItem button detail={false}>
            <IonLabel onClick={() => setShowRegistration(true)}>Change Mobile Number</IonLabel>
          </IonItem>
          <IonItem button detail={false}>
            <IonLabel onClick={() => dispatch(authActions.logout(device.deviceToken))}>Logout</IonLabel>
          </IonItem>
        </IonList>
      </ScrollingContent>
    </IonPage>
  );
};
