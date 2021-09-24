import ReactOtpInput from "react-otp-input";
import "./OtpInput.scss";

export const OtpInput: React.FC<any> = ({ ...props }) => {
  return (
    <ReactOtpInput
      containerStyle="otp-input-container"
      disabledStyle="disabled"
      inputStyle="input"
      errorStyle="error"
      focusStyle="focus"
      {...props}
    />
  );
};
