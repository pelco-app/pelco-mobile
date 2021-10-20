import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonLabel,
  IonLoading,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

import { Button, OtpInput, OtpPane, RegistrationPane } from "components";
import { authActions, useAppDispatch, useAppSelector } from "states";

import "./Login.scss";

interface Props {}

export const Login: React.FC<Props> = () => {
  const maxInput: number = 8;
  const dispatch = useAppDispatch();
  const { auth, messages } = useAppSelector((state) => state);
  const [accountNumber, setAccountNumber] = useState<any>("");
  const [mobileNumber, setMobileNumber] = useState<any>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);

  const showWelcomeScreen = () => dispatch(authActions.welcome(true));

  const proceedCheck = (reset?: boolean) => {
    dispatch(authActions.check({ accountNumber, reset }));
  };

  useEffect(() => {
    setHasError(false);
    setIsValidInput(accountNumber.length === maxInput);
  }, [accountNumber]);

  useEffect(() => {
    if (auth.check) {
      const { isRegistered, isMobileVerified, isReset } = auth.check;

      if (!isRegistered || !isMobileVerified || isReset) {
        setShowRegistration(true);
      } else if (isRegistered && isMobileVerified) {
        setShowOtp(true);
      }

      dispatch(authActions.reset("check"));
    }
  }, [auth.check]);

  useEffect(() => {
    if (auth.isRegistrationSuccess) {
      setShowOtp(true);
      dispatch(authActions.reset("isRegistrationSuccess"));
    }
  }, [auth.isRegistrationSuccess]);

  useEffect(() => {
    if (messages.error) {
      !showOtp && !showRegistration && setHasError(true);
    }
  }, [messages.error]);

  return (
    <IonPage>
      <IonLoading isOpen={auth.loading} message="Please wait..." />

      <IonContent fullscreen className="login-screen">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={showWelcomeScreen}>
              <IonIcon slot="icon-only" icon={chevronBackOutline} /> Welcome
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <div className="card">
          <IonCard>
            <div className="logo">
              <img src="assets/icons/icon.png" />
            </div>
            <IonCardContent className="card-content">
              <IonLabel>Account Number</IonLabel>
              <OtpInput
                hasErrored={hasError}
                isDisabled={auth.loading}
                isInputNum
                numInputs={maxInput}
                onChange={(value: number) => setAccountNumber(value)}
                separator={<span></span>}
                shouldAutoFocus
                value={accountNumber}
              />
              <Button
                disabled={auth.loading || !isValidInput || hasError}
                expand="block"
                label="Continue"
                onClick={() => proceedCheck()}
              />
              <Button
                color="danger"
                disabled={auth.loading || !isValidInput || hasError}
                expand="block"
                fill="outline"
                label="Reset account mobile number"
                onClick={() => proceedCheck(true)}
                size="small"
              />
            </IonCardContent>
          </IonCard>
        </div>

        <RegistrationPane
          accountNumber={accountNumber}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          setShowPane={setShowRegistration}
          showPane={showRegistration}
        />

        <OtpPane accountNumber={accountNumber} setShowPane={setShowOtp} showPane={showOtp} />
      </IonContent>
    </IonPage>
  );
};
