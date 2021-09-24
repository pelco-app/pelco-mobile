import { useContext, useEffect, useRef, useState } from "react";
import { IonContent, useIonLoading, useIonToast } from "@ionic/react";
import { CupertinoPane } from "cupertino-pane";
import { Button, OtpInput } from "components";
import { AppContext } from "State";
import { authActions } from "actions";
import { useInterval } from "usehooks-ts";
import "./OtpPane.scss";

interface Props {
  accountNumber: number;
  showPane: boolean;
  setShowPane: (state: boolean) => void;
}

const maxInput: number = 6;
const resendCooldown: number = 60;

export const OtpPane: React.FC<Props> = ({
  accountNumber,
  showPane,
  setShowPane,
}) => {
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
      setShowPane(false);
      setPin("");
      setDrawer(null);
    },
  };

  const proceed = (resend?: boolean) => {
    dismissToast();
    presentLoading({ message: "Please wait..." });
    if (resend) {
      setCanResend(false);
      setCooldown(resendCooldown);
      dispatch(authActions.resend({ accountNumber }));
    } else {
      dispatch(
        authActions.verify({ accountNumber, pin, deviceName: device.name })
      );
    }
  };

  useInterval(
    () => (cooldown === 1 ? setCanResend(true) : setCooldown(cooldown - 1)),
    !canResend ? 1000 : null
  );

  useEffect(() => setIsValidInput(pin.length === maxInput), [pin]);
  useEffect((): any => {
    !auth.loading && dismissLoading();
    return () => {
      drawer?.destroy({ animate: true });
      dismissLoading();
    };
  }, [auth.loading]);

  useEffect(() => {
    auth.error && showPane && setPin("");
    dismissLoading();
  }, [auth.error]);

  useEffect(() => {
    setDrawer(
      !!paneRef?.current && new CupertinoPane(paneRef.current, settings)
    );
    if (drawer && showPane) drawer.present({ animate: true });
  }, [paneRef, showPane]);

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
            label="Login"
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
