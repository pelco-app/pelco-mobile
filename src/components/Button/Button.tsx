import { IonButton, IonSpinner } from "@ionic/react";

type IonButtonProps = React.ComponentProps<typeof IonButton>;

interface Props extends IonButtonProps {
  loading?: boolean;
  label: string;
}

export const Button: React.FC<Props> = ({ label, loading, ...props }) => (
  <IonButton {...props}>{loading ? <IonSpinner color={props.color} name="crescent" /> : label}</IonButton>
);
