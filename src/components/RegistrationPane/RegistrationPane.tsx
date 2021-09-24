import { useContext, useEffect, useRef, useState } from "react";
import { IonContent, useIonToast } from "@ionic/react";
import { CupertinoPane } from "cupertino-pane";
import { Button, OtpInput } from "components";
import { AppContext } from "State";
import { authActions } from "actions";
import { useInterval } from "usehooks-ts";
import "./RegistrationPane.scss";

interface Props {
  accountNumber: number;
  showRegistrationPane: boolean;
  setShowRegistrationPane: (state: boolean) => void;
}

export const RegistrationPane: React.FC<Props> = ({
  accountNumber,
  showRegistrationPane,
  setShowRegistrationPane,
}) => {
  const maxInput: number = 6;
  const resendCooldown: number = 60;
  const [cooldown, setCooldown] = useState<number>(resendCooldown);
  const [canResend, setCanResend] = useState<boolean>(true);
  const { state, dispatch } = useContext(AppContext);
  const { auth } = state;
  const [otpCode, setOtpCode] = useState<any>("");
  const [drawer, setDrawer] = useState<any>();
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [presentToast, dismissToast] = useIonToast();
  const paneRef = useRef<any>(null);
  const settings = {
    backdrop: true,
    darkMode: true,
    handleKeyboard: false,
    onDidDismiss: () => {
      setShowRegistrationPane(false);
      setOtpCode("");
      drawer?.destroy({ animate: true });
    },
  };

  const proceedLogin = () => {
    dismissToast();
    dispatch(authActions.verify({ accountNumber, otpCode }));
  };

  const resendOtp = () => {
    dismissToast();
    setCanResend(false);
    setCooldown(resendCooldown);
    presentToast({
      duration: 3000,
      message: "Your OTP will be resend to your mobile number.",
      color: "dark",
    });
    dispatch(authActions.resend({ accountNumber }));
  };

  useInterval(
    () => {
      if (cooldown === 1) {
        setCanResend(true);
      } else {
        setCooldown(cooldown - 1);
      }
    },
    !canResend ? 1000 : null
  );

  useEffect(() => setIsValidInput(otpCode.length === maxInput), [otpCode]);

  useEffect(() => {
    setDrawer(
      !!paneRef?.current && new CupertinoPane(paneRef.current, settings)
    );
    if (drawer && showRegistrationPane) drawer.present({ animate: true });
  }, [paneRef, showRegistrationPane]);

  useEffect(() => {
    if (auth.error && showRegistrationPane) {
      setOtpCode("");
      presentToast({
        duration: 3000,
        message: auth.error,
        color: "dark",
      });
      dispatch(authActions.reset("error"));
    }
  }, [auth.error]);

  return (
    <IonContent ref={paneRef}>
      <div className="otp-pane-container">
        <div className="header">
          <h4>Register</h4>
          <p>
            Please verify your that you are the account owner by filling out the
            form below.
          </p>
        </div>

        <div className="content" hide-on-bottom="true">
          {/* <OtpInput
            isDisabled={auth.loading}
            isInputNum
            numInputs={maxInput}
            onChange={(value: number) => setOtpCode(value)}
            separator={<span></span>}
            shouldAutoFocus
            value={otpCode}
          />

          <Button
            disabled={auth.loading || !isValidInput}
            expand="block"
            label="Login"
            loading={auth.loading}
            onClick={proceedLogin}
          />
          <Button
            disabled={auth.loading || !canResend}
            expand="block"
            fill="outline"
            label={`Resend ${!canResend ? `(${cooldown})` : ""}`}
            onClick={resendOtp}
            size="small"
          /> */}
        </div>
      </div>
    </IonContent>
  );
};
