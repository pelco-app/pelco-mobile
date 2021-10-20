import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";

import { accountActions, useAppDispatch } from "states";

interface Props {
  onRefresh: (event: any) => void;
}

export const Refresher: React.FC<Props> = ({ onRefresh }) => {
  const dispatch = useAppDispatch();

  const doRefresh = (event: any) => {
    dispatch(accountActions.unreadNotificationCount());
    onRefresh(event);
  };

  return (
    <IonRefresher onIonRefresh={doRefresh} pullFactor={0.5} pullMax={1000} pullMin={100} slot="fixed">
      <IonRefresherContent
        pullingIcon={chevronDownOutline}
        pullingText="Pull to refresh"
        refreshingSpinner="dots"
      ></IonRefresherContent>
    </IonRefresher>
  );
};
