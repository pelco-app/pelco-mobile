import ReactOtpInput from "react-otp-input";
import "./OtpInput.scss";

export const OtpInput: React.FC<any> = ({ ...props }) => {
  return (
    <ReactOtpInput
      containerStyle="otp-input-container"
      disabledStyle="disabled"
      errorStyle="error"
      focusStyle="focus"
      inputStyle="input"
      {...props}
    />
  );
};
