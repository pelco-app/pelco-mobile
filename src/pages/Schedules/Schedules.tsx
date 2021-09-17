import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ExploreContainer } from "components";
import "./Schedules.scss";

export const Schedules: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schedules</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Schedules</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Schedules page" />
      </IonContent>
    </IonPage>
  );
};
