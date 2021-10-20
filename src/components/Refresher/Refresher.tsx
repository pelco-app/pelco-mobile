import { RefresherEventDetail } from "@ionic/core";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";

import { accountActions, useAppDispatch } from "states";

interface Props {
  onRefresh: (refresher: CustomEvent<RefresherEventDetail>) => void;
}

export const Refresher: React.FC<Props> = ({ onRefresh }) => {
  const dispatch = useAppDispatch();

  const doRefresh = (refresher: CustomEvent<RefresherEventDetail>) => {
    dispatch(accountActions.unreadNotificationCount());
    onRefresh(refresher);
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
