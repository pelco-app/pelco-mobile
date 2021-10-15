import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";

interface Props {
  onRefresh: (event: any) => void;
}

export const Refresher: React.FC<Props> = ({ onRefresh }) => {
  return (
    <IonRefresher onIonRefresh={onRefresh} pullFactor={0.5} pullMax={1000} pullMin={100} slot="fixed">
      <IonRefresherContent
        pullingIcon={chevronDownOutline}
        pullingText="Pull to refresh"
        refreshingSpinner="dots"
      ></IonRefresherContent>
    </IonRefresher>
  );
};
