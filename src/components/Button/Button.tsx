import { IonButton, IonSpinner } from "@ionic/react";

export const Button: React.FC<any> = ({ label, loading, ...props }) => (
  <IonButton {...props}>
    {loading ? <IonSpinner color={props.color} name="crescent" /> : label}
  </IonButton>
);
