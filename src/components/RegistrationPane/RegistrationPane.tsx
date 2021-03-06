import { useEffect, useRef, useState } from "react";
import { IonContent, IonInput, IonItem, IonLabel } from "@ionic/react";
import { CupertinoPane } from "cupertino-pane";

import { Button } from "components";
import { authActions, useAppDispatch, useAppSelector } from "states";

import "./RegistrationPane.scss";

interface Props {
  accountNumber?: number;
  buttonLabel?: string;
  header?: string;
  mobileNumber: string;
  setMobileNumber: (mobileNumber: string) => void;
  setShowPane: (state: boolean) => void;
  showPane: boolean;
}

export const RegistrationPane: React.FC<Props> = ({
  accountNumber,
  buttonLabel,
  header,
  mobileNumber,
  setMobileNumber,
  setShowPane,
  showPane,
}) => {
  const maxInput = { billingReference: 11, mobileNumber: 12 };
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const paneRef = useRef<any>();
  const [billingReference, setBillingReference] = useState<any>("");
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [drawer, setDrawer] = useState<any>(null);

  const settings = {
    backdrop: true,
    darkMode: true,
    handleKeyboard: false,
    onDidDismiss() {
      drawer?.destroy({ animate: true });
      setBillingReference("");
      setMobileNumber("");
      setShowPane(false);
    },
  };

  const proceed = () => {
    if (accountNumber) {
      dispatch(authActions.register({ accountNumber, billingReference, mobileNumber }));
    } else {
      dispatch(authActions.update({ billingReference, mobileNumber }));
    }
  };

  useEffect(() => {
    const validBillingReference = billingReference.length === maxInput.billingReference;
    const validMobileNumber = mobileNumber.startsWith("639") && mobileNumber.length === maxInput.mobileNumber;
    setIsValidInput(validBillingReference && validMobileNumber);
  }, [billingReference, mobileNumber]);

  useEffect(() => {
    setDrawer(!!paneRef?.current ? new CupertinoPane(paneRef.current, settings) : null);
  }, [paneRef]);

  useEffect(() => {
    if (showPane) {
      drawer?.present({ animate: true });
    } else if (drawer?.rendered) {
      drawer?.destroy({ animate: true });
    }
  }, [drawer, showPane]);

  return (
    <IonContent ref={paneRef}>
      <div className="registration-pane-container">
        <div className="header">
          <h4>{header || "Register"}</h4>
          <p>Please verify your that you are the account owner by filling out the form below.</p>
        </div>

        <div className="content" hide-on-bottom="true">
          <IonItem class="input-container">
            <IonLabel position="floating">Billing Reference Number</IonLabel>
            <IonInput
              clearInput
              inputmode="numeric"
              maxlength={maxInput.billingReference}
              onIonChange={(e) => {
                setBillingReference(e.detail.value);
                setBillingReference(e.detail.value?.replace(/\D/g, ""));
              }}
              placeholder="202xxxxxxxx"
              type="tel"
              value={billingReference}
            ></IonInput>
          </IonItem>

          <IonItem class="input-container">
            <IonLabel position="floating">Mobile Number</IonLabel>
            <IonInput
              clearInput
              inputmode="numeric"
              maxlength={maxInput.mobileNumber}
              onIonChange={(e) => {
                const value = e.detail.value as string;
                setMobileNumber(value);
                setMobileNumber(value?.replace(/\D/g, ""));
              }}
              placeholder="639xxxxxxxxx"
              type="tel"
              value={mobileNumber}
            ></IonInput>
          </IonItem>

          <Button
            disabled={auth.loading || !isValidInput}
            expand="block"
            label={buttonLabel || "Register"}
            onClick={() => proceed()}
          />
        </div>
      </div>
    </IonContent>
  );
};
