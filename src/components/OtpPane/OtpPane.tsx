import { useContext, useEffect, useRef, useState } from "react";
import { IonContent, useIonLoading, useIonToast } from "@ionic/react";
import { CupertinoPane } from "cupertino-pane";
import { Button, OtpInput } from "components";
import { AppContext } from "State";
import { authActions } from "context";
import { useInterval } from "usehooks-ts";
import "./OtpPane.scss";

interface Props {
  accountNumber?: number;
  buttonLabel?: string;
  mobileNumber?: string;
  setShowPane: (state: boolean) => void;
  showPane: boolean;
}

export const OtpPane: React.FC<Props> = ({ accountNumber, buttonLabel, mobileNumber, setShowPane, showPane }) => {
  const maxInput: number = 6;
  const resendCooldown: number = 60;
  const { state, dispatch } = useContext(AppContext);
  const { auth, device } = state;
  const [cooldown, setCooldown] = useState<number>(resendCooldown);
  const [canResend, setCanResend] = useState<boolean>(true);
  const [drawer, setDrawer] = useState<any>(null);
  const [pin, setPin] = useState<any>("");
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [presentLoading, dismissLoading] = useIonLoading();
  const [, dismissToast] = useIonToast();
  const paneRef = useRef<any>(null);
  const settings = {
    backdrop: true,
    darkMode: true,
    handleKeyboard: false,
    onDidDismiss() {
      drawer?.destroy({ animate: true });
      setPin("");
      setShowPane(false);
    },
  };

  const proceed = (resend?: boolean) => {
    dismissToast();
    presentLoading({ message: "Please wait..." });
    if (resend) {
      setCanResend(false);
      setCooldown(resendCooldown);
      if (accountNumber) {
        dispatch(authActions.resend({ accountNumber }));
      } else {
        dispatch(authActions.updateResend({ mobileNumber }));
      }
    } else {
      if (accountNumber) {
        dispatch(authActions.verify({ accountNumber, pin, deviceName: device.name }));
      } else {
        dispatch(authActions.updateVerify({ mobileNumber, pin }));
      }
    }
  };

  useInterval(() => (cooldown === 1 ? setCanResend(true) : setCooldown(cooldown - 1)), !canResend ? 1000 : null);

  useEffect(() => setIsValidInput(pin.length === maxInput), [pin]);

  useEffect((): any => {
    !auth.loading && setTimeout(() => dismissLoading(), 100);
    return () => {
      dismissLoading();
    };
  }, [auth.loading]);

  useEffect(() => {
    auth.error && showPane && setPin("");
    dismissLoading();
  }, [auth.error]);

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
      <div className="otp-pane-container">
        <div className="header">
          <h4>OTP Code</h4>
          <p>Enter the OTP Code sent to your registered mobile number.</p>
        </div>

        <div className="content" hide-on-bottom="true">
          <OtpInput
            isDisabled={auth.loading}
            isInputNum
            numInputs={maxInput}
            onChange={(value: number) => setPin(value)}
            separator={<span></span>}
            shouldAutoFocus
            value={pin}
          />

          <Button
            disabled={auth.loading || !isValidInput}
            expand="block"
            label={buttonLabel || "Login"}
            onClick={() => proceed()}
          />
          <Button
            disabled={auth.loading || !canResend}
            expand="block"
            fill="outline"
            label={`Resend ${!canResend ? `(${cooldown})` : ""}`}
            onClick={() => proceed(true)}
            size="small"
          />
        </div>
      </div>
    </IonContent>
  );
};
