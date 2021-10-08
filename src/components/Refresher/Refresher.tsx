import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";

interface Props {
  onRefresh: (event: any) => void;
}

export const Refresher: React.FC<Props> = ({ onRefresh }) => {
  return (
    <IonRefresher slot="fixed" onIonRefresh={onRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
      <IonRefresherContent
        pullingIcon={chevronDownOutline}
        pullingText="Pull to refresh"
        refreshingSpinner="dots"
      ></IonRefresherContent>
    </IonRefresher>
  );
};
