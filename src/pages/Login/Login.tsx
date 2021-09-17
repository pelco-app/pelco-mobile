import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonButton,
  IonSpinner,
  IonToolbar,
  IonPage,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  useIonToast,
} from "@ionic/react";
import { chevronBackOutline, compassSharp } from "ionicons/icons";
import { useContext, AppContext } from "State";
import { authActions } from "actions";
import OtpInput from "react-otp-input";
import "./Login.scss";

interface Props {}

export const Login: React.FC<Props> = () => {
  const { state, dispatch } = useContext(AppContext);
  const [accountNumber, setAccountNumber] = useState<any>("");
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [presentToast, dismissToast] = useIonToast();

  const showWelcomeScreen = () => dispatch(authActions.welcome(true));
  const proceedLogin = () => {
    dismissToast();
    dispatch(authActions.login({ accountNumber }));
  };

  useEffect(() => {
    setHasError(false);
    setIsValidInput(accountNumber.length === 8);
  }, [accountNumber]);

  useEffect(() => {
    if (state.auth.error) {
      setHasError(true);
      presentToast({
        buttons: [{ text: "Hide", handler: () => dismissToast() }],
        duration: 3000,
        message: state.auth.error,
      });
      dispatch(authActions.reset("error"));
    }
  }, [state.auth.error]);

  return (
    <IonPage>
      <IonContent fullscreen className="login-screen">
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon
              slot="icon-only"
              onClick={showWelcomeScreen}
              icon={chevronBackOutline}
            />
            <IonButton onClick={showWelcomeScreen} />
          </IonButtons>
        </IonToolbar>

        <div className="login-card">
          <IonCard>
            <div className="logo-container">
              <img src="assets/icons/icon.png" />
            </div>
            <IonCardContent>
              <IonLabel>Account Number</IonLabel>
              <OtpInput
                containerStyle="input-container"
                disabledStyle="disabled"
                inputStyle="input"
                errorStyle="error"
                focusStyle="focus"
                isInputNum={true}
                isDisabled={state.auth.loading}
                hasErrored={hasError}
                numInputs={8}
                onChange={(value: number) => setAccountNumber(value)}
                separator={<span></span>}
                shouldAutoFocus={true}
                value={accountNumber}
              />
              <IonButton
                expand="block"
                disabled={state.auth.loading || !isValidInput || hasError}
                onClick={proceedLogin}
              >
                {state.auth.loading ? <IonSpinner name="crescent" /> : "Login"}
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};
